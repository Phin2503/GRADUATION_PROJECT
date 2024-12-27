import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './guards/auth.service';
import { EmailConsumers } from 'src/modules/consumer/email.consumer';
import { BullModule } from '@nestjs/bull';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
  exports: [TypeOrmModule],
})
export class UserModule {}
