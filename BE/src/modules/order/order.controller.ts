import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { Theater } from '../theater/theater.entity';
import { CreateOrderDTO } from './dtos/createOrder.dto';

import { updateOrderDTO } from './dtos/updateOrder.dto';

@Controller('order')
export class SeatReservationController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/user/:userId')
  async getOrdersById(@Param('userId') userId: string) {
    return await this.orderService.getOrdersByUserId(userId);
  }
  @Get('/:theaterId/:showtimeId')
  async getSeat(
    @Param('theaterId') theaterId: number,
    @Param('showtimeId') showtimeId: number,
  ) {
    return await this.orderService.getSeatOrdered(theaterId, showtimeId);
  }

  @Get(':id')
  async getOrder(@Param('id') orderId: number) {
    return await this.orderService.getOrderByID(orderId);
  }

  @Post('/:theaterId/:showtimeId')
  async createOrder(
    @Param('theaterId') theaterId: number,
    @Param('showtimeId') showtimeId: number,
    @Body() requestBody: CreateOrderDTO,
  ) {
    return await this.orderService.createOrder(
      theaterId,
      showtimeId,
      requestBody,
    );
  }

  @Put('/update/:orderId')
  async updateOrder(
    @Param('orderId') orderId: number,
    @Body() requestBody: updateOrderDTO,
  ) {
    return await this.orderService.updateOrder(orderId, requestBody);
  }

  @Get('/update/:showtimeId/:orderId')
  async getSeatsOfOrder(
    @Param('showtimeId') showtimeId: number,
    @Param('orderId') orderId: number,
  ) {
    return await this.orderService.getSeatOrderedByOrderId(showtimeId, orderId);
  }
}
