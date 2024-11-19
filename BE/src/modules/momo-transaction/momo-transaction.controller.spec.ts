import { Test, TestingModule } from '@nestjs/testing';
import { MomoTransactionController } from './momo-transaction.controller';

describe('MomoTransactionController', () => {
  let controller: MomoTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MomoTransactionController],
    }).compile();

    controller = module.get<MomoTransactionController>(MomoTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
