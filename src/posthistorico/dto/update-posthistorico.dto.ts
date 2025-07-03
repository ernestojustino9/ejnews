import { PartialType } from '@nestjs/swagger';
import { CreatePosthistoricoDto } from './create-posthistorico.dto';

export class UpdatePosthistoricoDto extends PartialType(CreatePosthistoricoDto) {}
