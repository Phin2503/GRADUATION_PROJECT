import { Test, TestingModule } from '@nestjs/testing';
import { GroqaiController } from './groqai.controller';

describe('GroqaiController', () => {
  let controller: GroqaiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroqaiController],
    }).compile();

    controller = module.get<GroqaiController>(GroqaiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
