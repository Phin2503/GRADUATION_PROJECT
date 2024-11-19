import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ShowtimeService } from './showtime.service';
import { CreateShowtimeDto } from './dtos/create.dto';
import { PaginationDTO } from 'src/generic/pagination.dto';
import { updateShowtimeDto } from './dtos/update.dto';

@Controller('showtime')
export class ShowtimeController {
  constructor(private showtimeService: ShowtimeService) {}

  // @Post('/create')
  // async createShowtime(@Body() requestBody: CreateShowtimeDto) {
  //   return await this.showtimeService.createShowtime(requestBody);
  // }

  @Get('')
  async getAllShowtime(pagination: PaginationDTO) {
    return await this.showtimeService.getAll(pagination);
  }

  @Get('/:id')
  async getShowtimeById(@Param('id') id: number) {
    return await this.showtimeService.getById(id);
  }

  @Delete('/:id')
  async deleleShowtimeById(@Param('id') id: number): Promise<string> {
    return await this.showtimeService.deleteById(id);
  }

  @Put('/update/:id')
  async updateShowtimeById(
    @Param('id') id: number,
    @Body() requestBody: updateShowtimeDto,
  ) {
    return await this.showtimeService.updateShowtime(id, requestBody);
  }
}
