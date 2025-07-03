import { Test, TestingModule } from '@nestjs/testing';
import { PosthistoricoService } from './posthistorico.service';

describe('PosthistoricoService', () => {
  let service: PosthistoricoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PosthistoricoService],
    }).compile();

    service = module.get<PosthistoricoService>(PosthistoricoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
