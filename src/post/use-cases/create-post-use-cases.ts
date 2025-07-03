import { Repository } from "typeorm";
import { PostEntity } from "../entities/post.entity";
import { CreatePostDto } from "../dto/create-post.dto";

export class CreatePostUseCase {
  constructor(private readonly repositoryPost: Repository<PostEntity>) {}

  execute(input: CreatePostDto) {}
}
