import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || 'Bad request';
    } else if (exception instanceof Error) {
      // Handle domain/business logic errors
      if (exception.message.includes('already exists')) {
        status = HttpStatus.CONFLICT;
        message = exception.message;
      } else if (exception.message.includes('not found')) {
        status = HttpStatus.NOT_FOUND;
        message = exception.message;
      } else if (
        exception.message.includes('Invalid') ||
        exception.message.includes('must have')
      ) {
        status = HttpStatus.BAD_REQUEST;
        message = exception.message;
      } else {
        this.logger.error(
          `Unexpected error: ${exception.message}`,
          exception.stack,
        );
      }
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
    };

    this.logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
    );

    response.status(status).json(errorResponse);
  }
}
