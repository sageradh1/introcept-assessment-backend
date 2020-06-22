import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR, APP_FILTER, APP_PIPE } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { StudentModule } from './students/students.module';
import { HttpExceptionFilter } from './exceptions/http-exception.filters';
import { ValidationExceptionFilter } from './exceptions/validation-exception.filters';
import { ValidationPipe } from './pipes/validation.pipes';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, StudentModule],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
