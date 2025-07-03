import { Injectable } from '@nestjs/common';
import { CreatePosthistoricoDto } from './dto/create-posthistorico.dto';
import { UpdatePosthistoricoDto } from './dto/update-posthistorico.dto';

@Injectable()
export class PosthistoricoService {
  create(createPosthistoricoDto: CreatePosthistoricoDto) {
    return 'This action adds a new posthistorico';
  }

  findAll() {
    return `This action returns all posthistorico`;
  }

  findOne(id: number) {
    return `This action returns a #${id} posthistorico`;
  }

  update(id: number, updatePosthistoricoDto: UpdatePosthistoricoDto) {
    return `This action updates a #${id} posthistorico`;
  }

  remove(id: number) {
    return `This action removes a #${id} posthistorico`;
  }
}
