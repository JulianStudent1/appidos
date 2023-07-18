import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * facade of the jwt validation
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
