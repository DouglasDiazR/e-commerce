import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class RolesInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (!data) {
          return 'No hay data';
        }
        if (Array.isArray(data)) {
          return data.map(({ isAdmin, ...user }) => user);
        }
        const { isAdmin, ...user } = data;
        return user;
      }),
    );
  }
}
