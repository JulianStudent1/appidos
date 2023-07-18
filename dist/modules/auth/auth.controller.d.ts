import { LoggedUserDto } from '@models/dtos/logged-user.dto';
import { LoginUserDto } from '@models/dtos/login-user.dto';
import { UserEntity } from '@models/entities/user.entity';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    hasValidToken(token: string, userid: string): Promise<boolean>;
    login(body: LoginUserDto): Promise<LoggedUserDto>;
    register(post: UserEntity): Promise<UserEntity>;
    getOneUser(id: string): Promise<UserEntity>;
    update(data: UserEntity): Promise<UserEntity>;
    getUsersBy(): Promise<UserEntity[]>;
    deleteUser(id: string): Promise<UserEntity & Required<{
        _id: string;
    }>>;
    changePassword(newPassword: string, id: string): Promise<UserEntity & Required<{
        _id: string;
    }>>;
}
