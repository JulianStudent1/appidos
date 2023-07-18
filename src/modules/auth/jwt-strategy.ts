import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * this is a helper class to perform jwt validations
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'no-rubrics?', // should be binded to the enviroment variable
    });
  }

  /**
   * method coming from strategy
   * @param payload the payload
   * @returns the same
   */
  async validate(payload: any) {
    return payload;
  }
}
