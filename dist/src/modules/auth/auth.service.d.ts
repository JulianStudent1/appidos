import { UserEntity } from '@models/entities/user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { LoggedUserDto } from '@models/dtos/logged-user.dto';
import { ConfigService } from '@nestjs/config';
import { UtilsService } from '@modules/utils/utils.service';
export declare class AuthService {
    private readonly users;
    private jwtService;
    private configService;
    private utilsService;
    private readonly authTokenCode;
    private readonly recoverTokenCode;
    constructor(users: Model<UserEntity>, jwtService: JwtService, configService: ConfigService, utilsService: UtilsService);
    tokenIsValid(token: string, userid: string): Promise<boolean>;
    getUserById(id: string): Promise<UserEntity>;
    getUserByEmail(email: string): Promise<UserEntity>;
    getAllUsers(): Promise<UserEntity[]>;
    createUser(data: UserEntity): Promise<UserEntity>;
    updateUser(newdata: UserEntity): Promise<UserEntity>;
    loginEmailPassword(email: string, password: string): Promise<LoggedUserDto>;
    compare(password: string, hash: string): Promise<boolean>;
    hash(password: string): Promise<string>;
    delete(userid: string): Promise<UserEntity & Required<{
        _id: string;
    }>>;
    changePassword(id: string, newPassword: string): Promise<UserEntity & Required<{
        _id: string;
    }>>;
    generateRecoveryCode(email: string): Promise<void>;
    recoverAccount(code: string, newPassword: string): Promise<void>;
}
