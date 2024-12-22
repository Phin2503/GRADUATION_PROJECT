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
import { TheaterComplex } from '../theaterComplex/theaterComplex.entity';

@Injectable()
export class TheaterService {
  constructor(
    @InjectRepository(Theater)
    private readonly theaterRepository: Repository<Theater>,
    @InjectRepository(TheaterComplex)
    private readonly theaterComplexRepository: Repository<TheaterComplex>,
  ) {}

  async create(createTheaterDto: CreateTheaterDto) {
    await this.checkTheaterExists(createTheaterDto);

    const existingTheaterComplex =
      await this.theaterComplexRepository.findOneBy({
        id: createTheaterDto.theater_complexId,
      });

    const newTheater = this.theaterRepository.create({
      theater_complex: existingTheaterComplex,
      name: createTheaterDto.name,
      capacity: createTheaterDto.capacity,
    });

    return this.theaterRepository.save(newTheater);
  }

  async getAll(pagination) {
    return await this.theaterRepository.find({
      skip: pagination.skip,
      take: pagination.limit ?? DEFAULT_PAGE_SIZE,
      relations: ['theater_complex'],
    });
  }

  async updateById(id: number, theaterRequest: UpdateTheaterDto) {
    const oldTheater = await this.theaterRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!oldTheater) {
      throw new NotFoundException('Theater not found!');
    }

    const updatedTheater = {
      ...oldTheater,
      ...theaterRequest,
    };

    return await this.theaterRepository.save(updatedTheater);
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
