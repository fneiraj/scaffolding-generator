import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class CleanZipInterceptor implements NestInterceptor {
  constructor() {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    console.log('Cleaning up...');
    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse();
        res.on('finish', () => {
          console.log('Cleaning up...');
        });
      }),
    );
  }
}
