import { Module } from '@nestjs/common';
import { MomoTransactionController } from './momo-transaction.controller';
import { MomoTransactionService } from './momo-transaction.service';

@Module({
  controllers: [MomoTransactionController],
  providers: [MomoTransactionService],
})
export class MomoTransactionModule {}
