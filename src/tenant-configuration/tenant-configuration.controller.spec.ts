import { Test, TestingModule } from '@nestjs/testing';
import { TenantConfigurationController } from './tenant-configuration.controller';

describe('TenantConfigurationController', () => {
  let controller: TenantConfigurationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TenantConfigurationController],
    }).compile();

    controller = module.get<TenantConfigurationController>(TenantConfigurationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
