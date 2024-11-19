import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { TheaterService } from './theater.service';
import { CreateTheaterDto } from './dtos/create.dto';
import { PaginationDTO } from 'src/generic/pagination.dto';
import { UpdateTheaterDto } from './dtos/update.dto';

@Controller('theater')
export class TheaterController {
  constructor(private readonly theaterService: TheaterService) {}

  @Post('create')
  createTheater(@Body() requestBody: CreateTheaterDto) {
    return this.theaterService.create(requestBody);
  }

  @Get()
  getAllTheater(@Query() pagination: PaginationDTO) {
    return this.theaterService.getAll(pagination);
  }

  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.theaterService.findById(id);
  }

  @Put('/update/:id')
  updateById(@Param('id') id: number, @Body() requestBody: UpdateTheaterDto) {
    return this.theaterService.updateById(id, requestBody);
  }

  @Delete('/delete/:id')
  deleteById(@Param('id') id: number) {
    return this.theaterService.deleteById(id);
  }
}
