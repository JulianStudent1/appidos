import { LoggedUserDto } from '@models/dtos/logged-user.dto';
import { LoginUserDto } from '@models/dtos/login-user.dto';
import { UserEntity } from '@models/entities/user.entity';
import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseGuards,
  Query,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { AuthService } from './auth.service';

/**
 * controller of paths under 'auth'
 */
@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * check if a token is valid
   * @param token jwt
   * @param userid id of user
   * @returns boolean value
   */
  @Get('isValid')
  async hasValidToken(
    @Query('token') token: string,
    @Query('userid') userid: string,
  ) {
    return this.authService.tokenIsValid(token, userid);
  }

  /**
   * request a token
   * @param body payload
   * @returns set of data for authentication
   */
  @Post('login')
  async login(@Body() body: LoginUserDto): Promise<LoggedUserDto> {
    const { email, password } = body;
    return this.authService.loginEmailPassword(email, password);
  }

  /**
   * create a user in db
   * @param post payload
   * @returns inserted document
   */
  @Post('register')
  async register(@Body() post: UserEntity): Promise<UserEntity> {
    return await this.authService.createUser(post);
  }

  /**
   * get the single user data
   * @param id id of user to get
   * @returns user data
   */
  @UseGuards(JwtAuthGuard)
  @Get('getOne/:id')
  async getOneUser(@Param('id') id: string) {
    return await this.authService.getUserById(id);
  }

  /**
   * change user data except from password
   * @param data payload
   * @returns object data with changes
   */
  @UseGuards(JwtAuthGuard)
  @Put('update')
  async update(@Body() data: UserEntity): Promise<UserEntity> {
    return await this.authService.updateUser(data);
  }

  /**
   * method to get collection of user values from a give search param
   * @param field property to search on
   * @param value value to expect from property
   * @returns set of users, limited to 5 rows only
   */
  @UseGuards(JwtAuthGuard)
  @Get('getAll')
  async getUsersBy(): Promise<UserEntity[]> {
    return await this.authService.getAllUsers();
  }

  /**
   * delete a user
   * @param id id of document to delete
   * @returns deleted document
   */
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.authService.delete(id);
  }

  /**
   * change password of user
   * @param newPassword plain string password
   * @param id id of user
   * @returns user after update
   */
  @UseGuards(JwtAuthGuard)
  @Put('newPassword')
  async changePassword(
    @Query('password') newPassword: string,
    @Query('id') id: string,
  ) {
    const password = decodeURIComponent(newPassword);
    return await this.authService.changePassword(id, password);
  }

}
