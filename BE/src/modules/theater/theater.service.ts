import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Theater } from './theater.entity';
import { Repository } from 'typeorm';
import { CreateTheaterDto } from './dtos/create.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';
import { UpdateTheaterDto } from './dtos/update.dto';

@Injectable()
export class TheaterService {
  constructor(
    @InjectRepository(Theater)
    private readonly theaterRepository: Repository<Theater>,
  ) {}

  async create(createTheaterDto: CreateTheaterDto) {
    await this.checkTheaterExists(createTheaterDto);

    const newTheater = this.theaterRepository.create(createTheaterDto);

    return this.theaterRepository.save(newTheater);
  }

  async getAll(pagination) {
    return await this.theaterRepository.find({
      skip: pagination.skip,
      take: pagination.limit ?? DEFAULT_PAGE_SIZE,
    });
  }

  async updateById(id: number, theaterRequest: UpdateTheaterDto) {
    const oldTheater = this.theaterRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!oldTheater) throw new NotFoundException('Not found theater !');

    await this.checkTheaterExists(theaterRequest);
    const newTheater = { ...oldTheater, ...theaterRequest };

    return this.theaterRepository.save(newTheater);
  }

  async checkTheaterExists(request: UpdateTheaterDto | CreateTheaterDto) {
    if (
      await this.theaterRepository.findOneBy({
        name: request.name,
      })
    )
      throw new BadRequestException('Theater already exists !');
  }

  async deleteById(id: number) {
    const theaterExists = await this.findById(id);
    return await this.theaterRepository.delete({ id: theaterExists?.id });
  }

  async findById(id: number) {
    const theaterExists = await this.theaterRepository.findOne({
      where: {
        id: id,
      },
      relations: ['theater_complex'],
    });
    console.log(theaterExists);
    if (!theaterExists) {
      throw new NotFoundException('Not found theater !');
    }
    return theaterExists;
  }
}
