/* eslint-disable prettier/prettier */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    // request['user'] = this.authService.verifyToken(token);

    return super.canActivate(context);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['token']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
