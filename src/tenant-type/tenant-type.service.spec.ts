import { Test, TestingModule } from '@nestjs/testing';
import { TenantTypeService } from './tenant-type.service';

describe('TenantTypeService', () => {
  let service: TenantTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TenantTypeService],
    }).compile();

    service = module.get<TenantTypeService>(TenantTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
