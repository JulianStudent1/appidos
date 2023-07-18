import * as bcrypt from 'bcrypt';
import { UserEntity } from '@models/entities/user.entity';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { LoggedUserDto } from '@models/dtos/logged-user.dto';
import { ConfigService } from '@nestjs/config';
import { UtilsService } from '@modules/utils/utils.service';

type recoveryData = { id: string; password: string };

@Injectable()
export class AuthService {
  /**
   * secret to encypt and decrypt a jwt to use only for authentication
   */
  private readonly authTokenCode = this.configService.get('token_key');

  /**
   * secret to encypt and decrypt a jwt to use only for recovery account processes
   */
  private readonly recoverTokenCode = 'iamlostxd';

  constructor(
    @InjectModel('users') private readonly users: Model<UserEntity>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private utilsService: UtilsService,
  ) {}

  /**
   * Method to receive tokens stored in client to preserve log, it validates if the token is still valid
   * to prevent user to have expired tokens.
   * @param token the token stored in client for login
   */
  async tokenIsValid(token: string, userid: string) {
    try {
      const tokensecret = this.authTokenCode;
      const exists = await this.users.findById(userid);
      const logs = this.jwtService.verify(token, { secret: tokensecret });

      if (!exists || !logs) {
        throw new BadRequestException('Not logged or invalid token');
      }
      return true;
    } catch (error) {
      throw new BadRequestException('Not logged or invalid token');
    }
  }

  /**
   * Method to get a user by by, it might return an empty object if not found
   * @param id id of the object registered on DB
   * @returns what the db returns of the query
   */
  async getUserById(id: string): Promise<UserEntity> {
    try {
      const user = await this.users.findById(id);
      if (!user) {
        throw new NotFoundException('The requested resource was not found');
      }
      return user;
    } catch (error) {
      console.warn(error);
      throw new NotFoundException('The requested resource was not found');
    }
  }

  /**
   * Method to bring all users with certain email, should be at most one, or none
   * @param email plaing string email to be searched on db
   * @returns first user, if found
   */
  async getUserByEmail(email: string): Promise<UserEntity> {
    const collection: UserEntity[] = await this.users.find({ email });
    const user = collection.find((e) => e.email === email);
    if (!user) {
      throw new BadRequestException('Not found data');
    }
    return user;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    const data: UserEntity[] = await this.users.find();
    return data;
  }

  /**
   * Method to create a new user on DB, it hashes whatever it comes in db
   * @param data user object complete
   * @returns User that was created on db
   */
  async createUser(data: UserEntity): Promise<UserEntity> {
    try {
      data.password = await this.hash(data.password);
      return await this.users.create(data);
    } catch (error) {
      this.utilsService.logError(error, 'auth', 'createuser');
      throw new BadRequestException('Email/Username already exists.');
    }
  }

  /**
   * Method to update the entire user object except from the password
   * @param newdata user object complete and with the modifications expected to apply
   * @returns the object that is on Database
   */
  async updateUser(newdata: UserEntity): Promise<UserEntity> {
    try {
      const userid = newdata._id;
      const { password } = await this.getUserById(userid);
      newdata.password = password;

      return await this.users.findByIdAndUpdate(newdata._id, newdata, {
        new: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Cannot update object, check ID and data types',
      );
    }
  }

  /**
   * Method to use by the open route on API, it finds user by EMAIL and compare
   * hashed/salted password with plain string
   * @param email plain string email
   * @param password plains string password
   * @returns token to access secured routes
   */
  async loginEmailPassword(
    email: string,
    password: string,
  ): Promise<LoggedUserDto> {
    const user: UserEntity = await this.getUserByEmail(email);
    const right = await this.compare(password, user.password);
    if (!right) {
      throw new BadRequestException('Not found data');
    }
    const tokensecret = this.authTokenCode;
    const token: string = this.jwtService.sign(
      { id: user._id, role: user.role.roleName },
      { expiresIn: '14d', secret: tokensecret },
    );
    return { token, id: user._id };
  }

  /**Method to check whether or not a plain text received IS a cyphed password
   * @param password plain text
   * @param hash a hashed password
   * @returns a boolean value representing the result of the comparison
   */
  async compare(password: string, hash: string): Promise<boolean> {
    const matched = await bcrypt.compare(password, hash);
    return matched;
  }

  /**
   * Hash and salt passwords easily
   * @param password plain string password
   * @returns hashed password lol
   */
  async hash(password: string): Promise<string> {
    const saltrounds = Math.floor(Math.random() * 11);
    const hash = await bcrypt.hash(password, saltrounds);
    return hash;
  }

  /**
   * Method to delete user given
   * @param userid id of the user
   * @returns nothing (ideally)
   */
  async delete(userid: string) {
    try {
      return await this.users.findByIdAndDelete(userid);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * change password only.
   * @param id id from user
   * @param newPassword plain string password to apply
   * @returns entire user object with changes applied
   */
  async changePassword(id: string, newPassword: string) {
    try {
      const hashed = await this.hash(newPassword);
      return await this.users.findByIdAndUpdate(
        id,
        { $set: { password: hashed } },
        { new: true },
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * method to generate a code (a JWT with data encoded) that will expire in 1h,
   * also has necessary data for password change.
   * @param email mail of account to recover
   */
  async generateRecoveryCode(email: string) {
    try {
      const user = await this.getUserByEmail(email);
      const code = this.jwtService.sign(
        { id: user._id, password: user.password } as recoveryData,
        { expiresIn: '1h', secret: this.recoverTokenCode },
      );
    } catch (e) {
      this.utilsService.logError(e, 'authModule', 'generaterecoverycode');
      throw new InternalServerErrorException('Could not send email');
    }
  }

  /**
   * second step of recovery account, this is to change the password only
   * @param code the security code generated by the system in the first step
   * @param newPassword the new password of account
   */
  async recoverAccount(code: string, newPassword: string) {
    try {
      //if the code is valid, therefore is not expired
      if (this.jwtService.verify(code, { secret: this.recoverTokenCode })) {
        const { id, password } = this.jwtService.decode(code) as recoveryData;
        const user = await this.getUserById(id);

        //have retrieved the current data, allow operation if passwords haven't changed
        if (password === user.password) {
          await this.changePassword(id, newPassword);
          return;
        }
        throw new BadRequestException('Password already changed');
      }
      throw new NotAcceptableException('Invalid code');
    } catch (e) {
      throw new BadRequestException('Cannot recover this account');
    }
  }
}
