import { Repository } from "typeorm";
import { CategoriaEntity } from "../entities/categoria.entity";
import { CreateCategoriaDto } from "../dto/create-categoria.dto";

export class CreateCategoriaUseCase {
  constructor(
    private readonly repositoryCategoria: Repository<CategoriaEntity>
  ) {}

  execute(input: CreateCategoriaDto) {
    const categoria = new CategoriaEntity(input);
    return this.repositoryCategoria.save(categoria);
  }
}
