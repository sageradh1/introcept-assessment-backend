import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CommonResponse } from 'src/shared/common-response.model';

// Handling https expections
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const error =
      status !== HttpStatus.INTERNAL_SERVER_ERROR
        ? exception.message || 'HTTP Exception'
        : 'Internal Server Error';

    const myresponse = new CommonResponse(
      request.url,
      request.method,
      status,
      'Failure',
      new Date().toISOString(),
      {
        error: error,
      },
    );

    Logger.error(
      `${request.method} ${request.url}`,
      status !== HttpStatus.INTERNAL_SERVER_ERROR
        ? JSON.stringify(myresponse)
        : exception.stack,
      status !== HttpStatus.INTERNAL_SERVER_ERROR
        ? 'HTTP Exception'
        : 'Internal Server Error',
    );

    response.status(status).json(myresponse);
  }
}
