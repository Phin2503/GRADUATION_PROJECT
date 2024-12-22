import { Test, TestingModule } from '@nestjs/testing';
import { TypeTheaterController } from './type-theater.controller';

describe('TypeTheaterController', () => {
  let controller: TypeTheaterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeTheaterController],
    }).compile();

    controller = module.get<TypeTheaterController>(TypeTheaterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
