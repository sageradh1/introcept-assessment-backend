import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    Logger,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';


//To intercept every request and create logs before and after request 
@Injectable()
export class LoggingInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        const req = context.switchToHttp().getRequest();
        if (req) {
        const method = req.method;
        const url = req.url;

        return next
            .handle()
            .pipe(
                tap(() =>
                    Logger.log(
                        `Custom log : method:${method} url:${url} Timetaken:${Date.now() - now}ms`,
                        `class:${context.getClass().name}`,
                        ),
                    ),
                );
            }
    }

}
  