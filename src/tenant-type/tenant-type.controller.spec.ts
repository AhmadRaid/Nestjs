import { Test, TestingModule } from '@nestjs/testing';
import { TenantTypeController } from './tenant-type.controller';

describe('TenantTypeController', () => {
  let controller: TenantTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TenantTypeController],
    }).compile();

    controller = module.get<TenantTypeController>(TenantTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
