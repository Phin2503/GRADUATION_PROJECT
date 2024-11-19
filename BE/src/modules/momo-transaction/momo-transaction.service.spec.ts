import { Test, TestingModule } from '@nestjs/testing';
import { MomoTransactionService } from './momo-transaction.service';

describe('MomoTransactionService', () => {
  let service: MomoTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MomoTransactionService],
    }).compile();

    service = module.get<MomoTransactionService>(MomoTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
