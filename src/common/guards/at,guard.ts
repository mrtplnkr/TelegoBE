/* eslint-disable prettier/prettier */
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector, private authService: AuthService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      request['user'] = this.authService.verifyToken(token);
    } catch (e) {
      console.log('err123', e);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['token']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
