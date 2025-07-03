import { IsNotEmpty } from "class-validator";
export class CreateCategoriaDto {
  @IsNotEmpty()
  descricao: string;
}
