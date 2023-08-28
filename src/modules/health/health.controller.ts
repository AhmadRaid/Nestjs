import { Controller, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { Public } from '@decorators';
import { HealthService } from './health.service';

@ApiTags('Health')
@Controller('_health')
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Public()
  @ApiOperation({ summary: 'Check if the service is ready' })
  @ApiResponse({ status: 204, description: 'The service is ready.' })
  @ApiBadRequestResponse({ description: 'The service is not ready.' })
  @Get('ready')
  checkReady() {
    return this.healthService.checkReady();
  }

  @Public()
  @ApiOperation({ summary: 'Check if the service is live' })
  @ApiResponse({ status: 204, description: 'The service is live.' })
  @ApiBadRequestResponse({ description: 'The service is not live.' })
  @Get('live')
  checkLive() {
    return this.healthService.checkLive();
  }
}
