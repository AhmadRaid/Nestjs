import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerPath = 'api';

export const swaggerDocumentOptions = new DocumentBuilder()
  .setTitle('Api Gateway Service')
  .setTitle('Api Gateway Service API')
  .setDescription(
    `
    The Api Gateway Service API provides endpoints for managing api gateway.
    All API endpoints are secured using JWT Bearer authentication.

    ## Authentication
    To access the API endpoints, you need to include a valid JWT token in the Authorization header of your requests.

    ## API Endpoints
    - **GET /api-gatway**: Retrieve a list of api gateway.
    - **GET /api-gatway/{id}**: Get details of a specific api.
    - **POST /api-gatway**: Create a new api.
    - **PUT /api-gatway/{id}**: Update an existing api.
    - **DELETE /api-gatway/{id}**: Delete an api.

    ## User Credentials
    By default, the service is configured with an admin user account:
    - Username: admin
    - Password: admin

    ## Additional Documentation
    Refer to our documentation for detailed information on using the Api Gateway Service API: [API Documentation](https://docs.example.com/api-gatway-service)

    **Note**: Please replace the default admin user credentials and make sure to follow security best practices when deploying in a production environment.
  `,
  )
  .setVersion('1.0')
  // .setLicense('MIT', 'https://example.com/licenses/mit')
  .addServer('http://localhost:8056', 'Development Server')
  // .setTermsOfService('https://example.com/terms-of-service')
  .addServer('https://api-gatway.pagexa.com', 'Production Server')
  .addTag('Api Gateway', 'Endpoints for managing api gateway')
  // .setContact('Uni App Support', 'https://pagexa.com', 'support@pagexa.com')
  .addSecurity('bearer', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  })
  .addSecurityRequirements('bearer')
  .build();

export const swaggerSetupOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customCssUrl: `swagger/assets/swagger.css`,
  customfavIcon: `swagger/assets/favicon.png`,
  customSiteTitle: 'Api Gateway Service',
};
