import { Test, TestingModule } from '@nestjs/testing';
import { TypeTheaterService } from './type-theater.service';

describe('TypeTheaterService', () => {
  let service: TypeTheaterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeTheaterService],
    }).compile();

    service = module.get<TypeTheaterService>(TypeTheaterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
