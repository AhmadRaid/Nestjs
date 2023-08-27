import { Test, TestingModule } from '@nestjs/testing';
import { Tenant } from './tenant';

describe('Tenant', () => {
  let provider: Tenant;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Tenant],
    }).compile();

    provider = module.get<Tenant>(Tenant);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
