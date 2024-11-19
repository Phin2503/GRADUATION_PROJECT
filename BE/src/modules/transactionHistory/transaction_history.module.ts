import { Module } from '@nestjs/common';
import { TransactionHistoryController } from './transaction_history.controller';
import { TransactionHistoryService } from './transaction_history.service';

@Module({
  controllers: [TransactionHistoryController],
  providers: [TransactionHistoryService],
})
export class TransactionHistoryModule {}
