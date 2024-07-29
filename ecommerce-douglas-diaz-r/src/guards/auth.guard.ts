import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/enum/role.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Necesita un token');
    }
    try {
      const secret = process.env.JWT_SECRET;
      const userPayload = this.jwtService.verify(token, { secret });
      userPayload.iat = new Date(userPayload.iat * 1000);
      userPayload.exp = new Date(userPayload.exp * 1000);
      userPayload.roles = userPayload.isAdmin ? [Role.Admin] : [Role.User];

      request.user = userPayload;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Token invalido');
    }
  }
}
