/**
 * once logged the user, this data is what must sent and receive
 * to be able to access to the system
 */
export class LoggedUserDto {
  /**
   * jwt
   */
  token: string;

  /**
   * user id
   */
  id: string;
}
