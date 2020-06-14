import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { CommonResponse } from 'src/shared/common-response.model';

// Handling bad request exception
@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();


    const myresponse = new CommonResponse(
      request.url,
      request.method,
      status,
      "Failure",
      new Date().toISOString(),
      {
        error: exception.message ||"Bad Request"|| ""
      }
    );
    
    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(myresponse),
      'Bad Request' ,
    );


    response
      .status(status)
      .json(myresponse);
  }
}