import { Injectable } from '@nestjs/common';
import { TheaterComplex } from './theaterComplex.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TheaterComplexService {
  constructor(
    @InjectRepository(TheaterComplex)
    private readonly theaterComplexRepo: Repository<TheaterComplex>,
  ) {}

  async getAll() {
    return await this.theaterComplexRepo.find({});
  }
}
