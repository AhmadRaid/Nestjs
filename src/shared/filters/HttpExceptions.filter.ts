import {
  Catch,
  HttpStatus,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LoggerService } from '@pagexa/module-common-extend';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    public reflector: Reflector,
    private readonly _logger: LoggerService,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const userAgent = request.headers['user-agent'];

    if (userAgent) {
      if (
        userAgent.includes('Chrome') ||
        userAgent.includes('Firefox') ||
        userAgent.includes('Safari') ||
        userAgent.includes('Edge')
      ) {
        if (request.url == '/') {
          return response.redirect('/api');
        }

        // Render the 404 view for browser clients
        return response.status(HttpStatus.NOT_FOUND).render('404');
      }
    }

    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      code: status,
      timestamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      path: request.url,
      method: request.method,
      error:
        status !== HttpStatus.INTERNAL_SERVER_ERROR
          ? (exception.getResponse() as Record<string, any>)?.error || null
          : 'Internal server error',
      message: exception.message || null,
    };

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this._logger.error(
        `${request.method} ${request.url}`,
        exception.stack,
        'ExceptionFilter',
      );
    } else {
      this._logger.error(
        `${request.method} ${request.url}`,
        JSON.stringify(errorResponse),
        'ExceptionFilter',
      );
    }

    return response.status(status).json(errorResponse);
  }
}
