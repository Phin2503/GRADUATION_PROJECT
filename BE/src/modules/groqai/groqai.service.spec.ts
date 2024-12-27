import { Test, TestingModule } from '@nestjs/testing';
import { GroqaiService } from './groqai.service';

describe('GroqaiService', () => {
  let service: GroqaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroqaiService],
    }).compile();

    service = module.get<GroqaiService>(GroqaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
