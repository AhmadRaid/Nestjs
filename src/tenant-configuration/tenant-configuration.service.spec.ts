import { Test, TestingModule } from '@nestjs/testing';
import { TenantConfigurationService } from './tenant-configuration.service';

describe('TenantConfigurationService', () => {
  let service: TenantConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TenantConfigurationService],
    }).compile();

    service = module.get<TenantConfigurationService>(TenantConfigurationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
