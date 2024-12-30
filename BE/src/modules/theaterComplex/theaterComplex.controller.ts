import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { TheaterComplexService } from './theaterComplex.service';
import { CreateTheaterComplexDto } from './dtos/create.dto';
import { UpdateTheaterComplexDto } from './dtos/update.dto';

@Controller('theaterComplex')
export class TheaterComplexController {
  constructor(private readonly theaterComplexService: TheaterComplexService) {}

  @Get()
  async getAllTheater() {
    return this.theaterComplexService.getAll();
  }

  @Post()
  async createTheater(@Body() createDto: CreateTheaterComplexDto) {
    return this.theaterComplexService.create(createDto);
  }

  @Put(':id')
  async updateTheater(
    @Param('id') id: number,
    @Body() updateDto: UpdateTheaterComplexDto,
  ) {
    return this.theaterComplexService.update(id, updateDto);
  }
}
