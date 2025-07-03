import { Module } from '@nestjs/common';
import { PosthistoricoService } from './posthistorico.service';
import { PosthistoricoController } from './posthistorico.controller';

@Module({
  controllers: [PosthistoricoController],
  providers: [PosthistoricoService],
})
export class PosthistoricoModule {}
