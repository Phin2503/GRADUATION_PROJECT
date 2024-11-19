import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UploadedFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from './food.entity';
import { createFoodDto } from './dtos/create.dto';
import { updateFoodDto } from './dtos/update.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food) private readonly foodRepository: Repository<Food>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getAll() {
    return await this.foodRepository.find();
  }

  async deleteById(id: number) {
    try {
      this.getById(id);
      await this.foodRepository.delete(id);
    } catch (err) {
      throw new BadRequestException('Something went wrong !' + err);
    }
  }

  async getById(id: number) {
    const food = await this.foodRepository.findOneBy({ id: id });
    if (!food) throw new NotFoundException('Not found food !');
    return food;
  }

  async create(
    requestBody: createFoodDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const existFood = await this.foodRepository.findOneBy({
      name: requestBody.name,
    });

    if (existFood) throw new BadRequestException('Food name already exists !');
    try {
      const ImgUrl = await this.cloudinaryService.uploadImage(file);

      requestBody.img_url = ImgUrl.url;

      const newFood = await this.foodRepository.create(requestBody);
      return await this.foodRepository.save(newFood);
    } catch (err) {
      throw new BadRequestException('Some thing went wrong !' + err);
    }
  }

  async updateById(id: number, requestBody: updateFoodDto, file) {
    const existFood = await this.foodRepository.findOneBy({ id: id });

    if (!existFood) throw new NotFoundException("Food don't exists !");
    try {
      const ImgUrl = await this.cloudinaryService.uploadImage(file);

      requestBody.img_url = ImgUrl.url;

      const newFood = { ...existFood, ...requestBody };
      return await this.foodRepository.save(newFood);
    } catch (err) {
      throw new BadRequestException('Some thing went wrong !' + err);
    }
  }
}
