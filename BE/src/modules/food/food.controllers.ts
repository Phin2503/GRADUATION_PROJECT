import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { createFoodDto } from './dtos/create.dto';
import { updateFoodDto } from './dtos/update.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get('')
  async getAllFood() {
    return this.foodService.getAll();
  }

  @Delete('/delete/:id')
  async deteleById(@Param('id') id: number) {
    return this.foodService.deleteById(id);
  }

  @Put('/update/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateById(
    @Param('id') id: number,
    @Body() requestBody: updateFoodDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.foodService.updateById(id, requestBody, file);
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() requestBody: createFoodDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.foodService.create(requestBody, file);
  }

  @Get('/:id')
  async getById(@Param('id') id: number) {
    return this.foodService.getById(id);
  }
}
