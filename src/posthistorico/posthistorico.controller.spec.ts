import { Test, TestingModule } from '@nestjs/testing';
import { PosthistoricoController } from './posthistorico.controller';
import { PosthistoricoService } from './posthistorico.service';

describe('PosthistoricoController', () => {
  let controller: PosthistoricoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PosthistoricoController],
      providers: [PosthistoricoService],
    }).compile();

    controller = module.get<PosthistoricoController>(PosthistoricoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
