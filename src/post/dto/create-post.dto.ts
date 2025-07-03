import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";
export class CreatePostDto {
  imgURL: string;

  @IsNotEmpty()
  titulo: string;

  @IsNotEmpty()
  descricao: string;

  @IsNotEmpty()
  categoriaId: string;

  @IsOptional()
  publicado: boolean;
}
