import { ReturnCategory } from "src/categoria/dto/return-categoria.dto";
import { PostEntity } from "../entities/post.entity";
// import { ReturnUserDto } from "src/user/dtos/returnUser.dto";

export class ReturnPostsDto {
  id: string;
  imgURL: string;
  titulo: string;
  descricao: string;
  slug: string;
  categoria?: ReturnCategory;
  //user?: ReturnUserDto;

  constructor(post: PostEntity) {
    this.id = post.id;
    this.imgURL = post.imgURL;
    this.titulo = post.titulo;
    this.descricao = post.descricao;
    this.slug = post.slug;
    this.categoria = post.categoria
      ? new ReturnCategory(post.categoria)
      : undefined;
    // this.user = post.user ? new ReturnUserDto(post.user) : undefined;
  }
}
