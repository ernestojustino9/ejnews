import { ReturnPostsDto } from "src/post/dto/returnPosts.dto";
import { CategoriaEntity } from "../entities/categoria.entity";

export class ReturnCategory {
  id: string;
  descricao: string;
  amountPosts?: number;
  noticias?: ReturnPostsDto[];

  constructor(categoryEntity: CategoriaEntity, amountPosts?: number) {
    this.id = categoryEntity.id;
    this.descricao = categoryEntity.descricao;
    this.amountPosts = amountPosts;
    this.noticias = categoryEntity.posts
      ? categoryEntity.posts.map((post) => new ReturnPostsDto(post))
      : undefined;
  }
}
