import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { ShowtimeService } from './showtime.service';
import { CreateShowtimeDto } from './dtos/create.dto';
import { PaginationDTO } from 'src/generic/pagination.dto';
import { updateShowtimeDto } from './dtos/update.dto';
import { Showtime } from './showtime.entity';

@Controller('showtime')
export class ShowtimeController {
  constructor(private showtimeService: ShowtimeService) {}

  @Post('/create')
  async createShowtime(
    @Body() requestBody: CreateShowtimeDto,
  ): Promise<Showtime> {
    return await this.showtimeService.createShowtime(requestBody);
  }

  @Get('/:theaterId/:date')
  async fetchShowtimesByTheaterIdAndDate(
    @Param('theaterId') theaterId: number,
    @Param('date') date: string,
  ) {
    return this.showtimeService.getShowtimesByTheaterAndDate(theaterId, date);
  }

  @Get('/')
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

  @Get('/movie/:id')
  async getByMovieID(@Param('id') id: number) {
    return await this.showtimeService.getByMovieId(id);
  }

  @Put('/update/:id')
  async updateShowtimeById(
    @Param('id') id: number,
    @Body() requestBody: updateShowtimeDto,
  ) {
    return await this.showtimeService.updateShowtime(id, requestBody);
  }
}
