import { Injectable } from '@nestjs/common';
import { TheaterComplex } from './theaterComplex.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTheaterComplexDto } from './dtos/update.dto';
import { CreateTheaterComplexDto } from './dtos/create.dto'; // Import DTO cho Create

@Injectable()
export class TheaterComplexService {
  constructor(
    @InjectRepository(TheaterComplex)
    private readonly theaterComplexRepo: Repository<TheaterComplex>,
  ) {}

  async getAll() {
    return await this.theaterComplexRepo.find({});
  }

  async update(id: number, updateDto: UpdateTheaterComplexDto) {
    const theaterComplex = await this.theaterComplexRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!theaterComplex) {
      throw new Error('Theater complex not found');
    }

    Object.assign(theaterComplex, updateDto);
    return await this.theaterComplexRepo.save(theaterComplex);
  }

  async create(createDto: CreateTheaterComplexDto) {
    const newTheaterComplex = this.theaterComplexRepo.create(createDto);
    return await this.theaterComplexRepo.save(newTheaterComplex);
  }
}
