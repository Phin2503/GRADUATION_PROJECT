import { Controller, Get } from '@nestjs/common';
import { TheaterComplexService } from './theaterComplex.service';

@Controller('theaterComplex')
export class TheaterComplexController {
  constructor(private readonly theaterComplexService: TheaterComplexService) {}

  @Get()
  getAllTheater() {
    return this.theaterComplexService.getAll();
  }
}
