import * as winston from 'winston';
import { format, transports, Logger } from 'winston';
import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  private readonly logger: Logger;

  constructor() {
    super();
    const logLevel = process.env.WINSTON_LOG_LEVEL || 'info';
    const logTransports = process.env.WINSTON_LOG_TRANSPORTS || '';

    this.logger = winston.createLogger({
      level: logLevel,
      format: winston.format.simple(),
      transports: this.getTransports(logTransports),
      exitOnError: process.env.WINSTON_LOG_EXIT_ON_ERROR === 'true',
      handleExceptions: process.env.WINSTON_LOG_HANDLE_EXCEPTIONS === 'true',
    });

    if (process.env.NODE_ENV === 'development') {
      this.debug('Logging initialized at debug level');
    }
  }

  private getTransports(logTransports: string): winston.transport[] {
    const availableTransports: winston.transport[] = [];

    if (logTransports.includes('console')) {
      availableTransports.push(
        new transports.Console({
          format: format.combine(
            format.timestamp(),
            format.colorize(),
            format.simple(),
          ),
        }),
      );
    }

    if (logTransports.includes('file')) {
      availableTransports.push(
        new transports.File({
          filename: 'logs/app.log',
          format: format.combine(format.timestamp(), format.json()),
        }),
      );
    }

    // If no transports are specified, add the console transport by default
    if (availableTransports.length === 0) {
      availableTransports.push(
        new transports.Console({
          format: format.combine(
            format.timestamp(),
            format.colorize(),
            format.simple(),
          ),
        }),
      );
    }

    return availableTransports;
  }

  log(message: string, level = 'info', ...args: any[]): void {
    this.logger.log(level, message, ...args);
  }

  info(message: string, ...args): void {
    this.logger.info(message, ...args);
  }

  debug(message: string, ...args): void {
    this.logger.debug(message, ...args);
  }

  error(message: string, trace?: any, context?: string): void {
    const errorMessage = `${context || ''} ${message} -> (${
      trace || 'trace not provided!'
    })`;
    this.logger.error(errorMessage);
  }

  warn(message: string, ...args: any[]): void {
    this.logger.warn(message, ...args);
  }
}
