import { forwardRef, Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "./entities/post.entity";
import { CategoriaModule } from "src/categoria/categoria.module";
import { PostHistoricoEntity } from "src/posthistorico/entities/posthistorico.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, PostHistoricoEntity]),
    forwardRef(() => CategoriaModule),
  ],
  exports: [PostService],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
