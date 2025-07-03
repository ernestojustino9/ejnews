import { Repository } from "typeorm";
import { CategoriaEntity } from "../entities/categoria.entity";
import { CreateCategoriaDto } from "../dto/create-categoria.dto";

export class CreateCategoriaUseCase {
  constructor(
    private readonly repositoryCategoria: Repository<CategoriaEntity>
  ) {}

  // execute(input: CreateCategoriaDto) {
  //   const categoria = new CategoriaEntity(input);
  //   return this.repositoryCategoria.save(categoria);
  // }
}


// import { UserM } from 'src/domains/model/user';
// import { UserRepository } from 'src/domains/repositories/user.repository';
// import { CreateUserDto } from 'src/presentations/user/dto/create-user.dto';

// export class CreateUserUseCases {
//   constructor(private usersRepository: UserRepository) {}

//   async execute(createUserDto: CreateUserDto): Promise<UserM> {
//     return this.usersRepository.createUser(createUserDto);
//   }
// }