import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EmailConsumers } from '../consumer/email.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'send-mail',
    }),
  ],
  providers: [EmailConsumers],
  exports: [BullModule],
})
export class EmailModule {}
