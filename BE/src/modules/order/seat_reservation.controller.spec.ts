import { Test, TestingModule } from '@nestjs/testing';
import { SeatReservationController } from './order.controller';

describe('SeatReservationController', () => {
  let controller: SeatReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeatReservationController],
    }).compile();

    controller = module.get<SeatReservationController>(
      SeatReservationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
