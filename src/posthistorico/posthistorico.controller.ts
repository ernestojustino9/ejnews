import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PosthistoricoService } from './posthistorico.service';
import { CreatePosthistoricoDto } from './dto/create-posthistorico.dto';
import { UpdatePosthistoricoDto } from './dto/update-posthistorico.dto';

@Controller('posthistorico')
export class PosthistoricoController {
  constructor(private readonly posthistoricoService: PosthistoricoService) {}

  @Post()
  create(@Body() createPosthistoricoDto: CreatePosthistoricoDto) {
    return this.posthistoricoService.create(createPosthistoricoDto);
  }

  @Get()
  findAll() {
    return this.posthistoricoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.posthistoricoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePosthistoricoDto: UpdatePosthistoricoDto) {
    return this.posthistoricoService.update(+id, updatePosthistoricoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.posthistoricoService.remove(+id);
  }
}
