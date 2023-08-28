import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService, LoggerService } from '@pagexa/module-common-extend';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly logger: LoggerService,
    private readonly configService: ConfigService,
  ) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const requestId = this.generateRequestId();

    const logMessage = `${req.method} ${req.url} [Request ID: ${requestId}]`;
    this.logger.info(logMessage);

    next();
  }

  private generateRequestId(): string {
    const uuid = uuidv4();
    const APP_NAME = this.configService.get('APP_NAME');

    return `${APP_NAME}-${uuid}`;
  }
}
