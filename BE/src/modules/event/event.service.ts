import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UploadedFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './dtos/createEventDto.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    requestBody: CreateEventDto,
    @UploadedFile() file1: Express.Multer.File,
    @UploadedFile() file2: Express.Multer.File,
  ) {
    const existFood = await this.eventRepository.findOneBy({
      title: requestBody.title,
    });

    if (existFood)
      throw new BadRequestException('Title event already exists !');
    try {
      const ImgUrl1 = await this.cloudinaryService.uploadImage(file1);
      const ImgUrl2 = await this.cloudinaryService.uploadImage(file2);

      requestBody.main_img_url = ImgUrl1.url;
      requestBody.sub_img_url = ImgUrl2.url;

      const newEvent = await this.eventRepository.create(requestBody);
      return await this.eventRepository.save(newEvent);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Some thing went wrong !' + err);
    }
  }

  async getById(id: number) {
    const existingEvent = await this.eventRepository.findOneBy({
      id: id,
    });

    if (!existingEvent) {
      throw new NotFoundException('Not found event !');
    }

    return existingEvent;
  }

  async getAll() {
    return await this.eventRepository.find();
  }
}
