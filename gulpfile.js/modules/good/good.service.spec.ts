import { Test, TestingModule } from '@nestjs/testing';
import { GoodService } from './good.service';

describe('GoodService', () => {
  let service: GoodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoodService],
    }).compile();

    service = module.get<GoodService>(GoodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
