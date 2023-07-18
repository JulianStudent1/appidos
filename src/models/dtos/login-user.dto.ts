/**
 * what is perceived by server when user is loggind
 */
export class LoginUserDto {
  /**
   * presumed user email
   */
  email: string;

  /**
   * presumedn plain string user password
   */
  password: string;
}
