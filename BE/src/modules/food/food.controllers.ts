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
  getAllFood() {
    return this.foodService.getAll();
  }

  @Delete('/delete/:id')
  deteleById(@Param('id') id: number) {
    return this.foodService.deleteById(id);
  }

  @Put('/update/:id')
  @UseInterceptors(FileInterceptor('file'))
  updateById(
    @Param('id') id: number,
    @Body() requestBody: updateFoodDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.foodService.updateById(id, requestBody, file);
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() requestBody: createFoodDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.foodService.create(requestBody, file);
  }

  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.foodService.getById(id);
  }
}
