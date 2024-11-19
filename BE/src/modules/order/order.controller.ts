import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { Theater } from '../theater/theater.entity';
import { CreatOrderDTO } from './dtos/createOrder.dto';
import { Order } from './order.entity';
import { updateOrderDTO } from './dtos/updateOrder.dto';

@Controller('order')
export class SeatReservationController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/:theaterId/:showtimeId')
  getSeat(
    @Param('theaterId') theaterId: number,
    @Param('showtimeId') showtimeId: number,
  ) {
    return this.orderService.getSeatOrdered(theaterId, showtimeId);
  }

  @Post('/:theaterId/:showtimeId')
  createOrder(
    @Param('theaterId') theaterId: number,
    @Param('showtimeId') showtimeId: number,
    @Body() requestBody: CreatOrderDTO,
  ) {
    return this.orderService.createOrder(theaterId, showtimeId, requestBody);
  }

  @Put('/update/:orderId')
  updateOrder(
    @Param('orderId') orderId: number,
    @Body() requestBody: updateOrderDTO,
  ) {
    return this.orderService.updateOrder(orderId, requestBody);
  }

  @Get('/update/:showtimeId/:orderId')
  getSeatsOfOrder(
    @Param('showtimeId') showtimeId: number,
    @Param('orderId') orderId: number,
  ) {
    return this.orderService.getSeatOrderedByOrderId(showtimeId, orderId);
  }
}
