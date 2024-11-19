import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MovieModule } from './modules/movie/movie.module';
import { TheaterModule } from './modules/theater/theater.module';
import { ShowtimeModule } from './modules/showtime/showtime.module';
import { SeatModule } from './modules/seat/seat.module';
import { SeatReservationModule } from './modules/order/order.module';
import { PaymentModule } from './modules/payment/payment.module';
import { TransactionHistoryModule } from './modules/transactionHistory/transaction_history.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { UploadController } from './cloudinary/upload.controller';
import { CloudinaryService } from './cloudinary/cloudinary.service';

import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfig } from './configs/mail.config';
import { DatabaseConfig } from './configs/database.config';
import { TheaterComplexModule } from './modules/theaterComplex/theaterComplex.module';
import { TheaterComplexController } from './modules/theaterComplex/theaterComplex.controller';
import { TheaterComplexService } from './modules/theaterComplex/theaterComplex.service';
import { FoodModule } from './modules/food/food.module';
import { MomoTransactionModule } from './modules/momo-transaction/momo-transaction.module';
import { VnpayModule } from './modules/vnpay/vnpay.module';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => MailConfig(),
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.HOST_REDIS,
        port: +process.env.PORT_REDIS,
      },
    }),
    CloudinaryModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    TypeOrmModule.forRootAsync({
      useFactory: DatabaseConfig,
      inject: [ConfigService],
    }),
    UserModule,
    MovieModule,
    TheaterModule,
    ShowtimeModule,
    SeatModule,
    SeatReservationModule,
    FoodModule,
    PaymentModule,
    TransactionHistoryModule,
    TheaterComplexModule,
    MomoTransactionModule,
    VnpayModule,
  ],
  controllers: [AppController, UploadController, TheaterComplexController],
  providers: [AppService, CloudinaryService, TheaterComplexService],
})
export class AppModule {}
