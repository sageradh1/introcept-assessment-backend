import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { StudentModule } from './students/students.module';
import { HttpExceptionFilter } from './exceptions/http-exception.filters';
import { ValidationExceptionFilter } from './exceptions/validation-exception.filters';
import { ValidationPipe } from './pipes/validation.pipes';

@Module({
  imports: [StudentModule],
  controllers: [AppController],
  providers: [AppService,
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
  }
  ],
})
export class AppModule {}
