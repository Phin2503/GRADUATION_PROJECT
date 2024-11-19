import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SeatService } from './seat.service';
import { CreatSeatDto } from './dtos/create.dto';
import { UpdateSeatDto } from './dtos/update.dto';
import { PaginationDTO } from 'src/generic/pagination.dto';
import { Seat } from './seat.entity';

@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Post('create')
  createSeat(@Body() requestBody: CreatSeatDto) {
    return this.seatService.create(requestBody);
  }

  @Get('/:id')
  getSeatById(@Param('id') id: number) {
    return this.seatService.getById(id);
  }

  @Put('/:id')
  UpdateSeat(@Param('id') id: number, @Body() requestBody: UpdateSeatDto) {
    return this.seatService.update(id, requestBody);
  }

  @Get()
  getAllSeat(pagination: PaginationDTO) {
    return this.seatService.getAll(pagination);
  }

  @Delete('/:id')
  deleteById(@Param('id') id: number): Promise<string> {
    return this.seatService.delete(id);
  }

  @Get('/theater/:id')
  findByTheaterId(@Param('id') id: number): Promise<Seat[] | string> {
    return this.seatService.findByTheaterId(id);
  }
}
