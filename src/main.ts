import { join } from 'path';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import morganMiddleware from 'morgan';
import compressionMiddleware from 'compression';
import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { LoggerService, ConfigService } from '@pagexa/module-common-extend';

import { HttpExceptionFilter } from '@filters';

// IMPORTING MODULES
import { AppModule } from './modules/app/app.module';
import { SharedModule } from '@shared/shared.module';

import {
  swaggerPath,
  swaggerSetupOptions,
  swaggerDocumentOptions,
} from './swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );

  // CONFIG SERVICE
  const configService = app.select(SharedModule).get(ConfigService);

  // GET BASE CONFIGS
  const apiPrefix = configService.get('API_PREFIX');
  const apiVersion = configService.get('API_VERSION');

  // LOGGER SERVICE
  const logger = app.select(SharedModule).get(LoggerService);
  app.useLogger(logger);

  // Enable compression
  app.use(compressionMiddleware());

  // Logging with Morgan
  app.use(
    morganMiddleware('combined', {
      stream: {
        write: (message) => {
          logger.info(message);
        },
      },
    }),
  );

  const reflector = app.get(Reflector);

  // Set up static assets
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static/',
  });

  app.useStaticAssets(join(__dirname, '..', 'src', 'swagger', 'assets'), {
    prefix: `/swagger/assets/`,
  });

  app.setBaseViewsDir(join(__dirname, '..', '..', 'src', 'views'));

  //Sets our app to use the ejs engine
  app.setViewEngine('ejs');

  // APP CONFIGURATIONS
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.setGlobalPrefix(`${apiPrefix}/${apiVersion}`, {
    exclude: ['static', 'public', 'swagger'],
  });

  // Register filters
  app.useGlobalFilters(new HttpExceptionFilter(reflector, logger));

  // SWAGGER SERVICE
  const document = SwaggerModule.createDocument(app, swaggerDocumentOptions);

  Object.values((document as OpenAPIObject).paths).forEach((path: any) => {
    Object.values(path).forEach((method: any) => {
      if (
        Array.isArray(method.security) &&
        method.security.includes('isPublic')
      ) {
        method.security = [];
      }
    });
  });

  SwaggerModule.setup(swaggerPath, app, document, swaggerSetupOptions);

  const port = configService.getNumber('PORT') || 8056;
  const host = configService.get('HOST') || '127.0.0.1';

  // Start the application
  await app.listen(port, host);

  logger.info(`🚀 Server running on https://${host}:${port}`);
}

bootstrap();
