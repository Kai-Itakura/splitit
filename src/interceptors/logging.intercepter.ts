import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    console.log('=== Request ===');
    console.log({
      url: request.url,
      headers: request.headers,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      body: request.body,
      query: request.query,
      params: request.params,
    });

    return next.handle().pipe(
      tap((responseBody) => {
        console.log('=== Response ===');
        console.log({
          statusCode: response.statusCode,
          headers: response.getHeaders(),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          body: responseBody,
        });
      }),
    );
  }
}
