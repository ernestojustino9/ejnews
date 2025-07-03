import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { CategoriaEntity } from "./entities/categoria.entity";
import { PostService } from "src/post/post.service";
import { ReturnCategory } from "./dto/return-categoria.dto";
import { CountPosts } from "src/post/dto/count-posts.dto";
import { CreateCategoriaDto } from "./dto/create-categoria.dto";
import { UpdateCategoriaDto } from "./dto/update-categoria.dto";

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(CategoriaEntity)
    private readonly categoriaRepository: Repository<CategoriaEntity>,

    @Inject(forwardRef(() => PostService))
    private readonly postsService: PostService
  ) {}

  //
  findAmountCategoryInPosts(
    categoria: CategoriaEntity,
    countList: CountPosts[]
  ): number {
    const count = countList.find(
      (itemCount) => itemCount.categoriaId === categoria.id
    );

    if (count) {
      return count.total;
    }

    return 0;
  }

  // Buscar
  async findCategoria(): Promise<ReturnCategory[]> {
    const categories = await this.categoriaRepository.find();

    const count = await this.postsService.countPostsByCategoryId();

    if (!categories || categories.length === 0) {
      throw new NotFoundException("Categoria esta vazio");
    }

    return categories.map(
      (category) =>
        new ReturnCategory(
          category,
          this.findAmountCategoryInPosts(category, count)
        )
    );
  }

  //Buscar por id
  async findCodigo(
    categoriaId: string,
    isRelations?: boolean
  ): Promise<CategoriaEntity> {
    const relations = isRelations
      ? {
          posts: true,
        }
      : undefined;

    const category = await this.categoriaRepository.findOne({
      where: {
        id: categoriaId,
      },
      relations,
    });

    if (!category) {
      throw new NotFoundException(
        `O id da categoria: ${categoriaId} nao foi encontrado`
      );
    }

    return category;
  }

  async findCategoryByDescricao(descricao: string): Promise<CategoriaEntity> {
    const categoria = await this.categoriaRepository.findOne({
      where: {
        descricao,
      },
    });

    if (!categoria) {
      throw new NotFoundException(`Categoria descricao ${descricao} not found`);
    }

    return categoria;
  }

  // async createCategoria(
  //   createCategoriaDto: CreateCategoriaDto
  // ): Promise<CategoriaEntity> {
  //   const category = await this.findCategoryByDescricao(
  //     createCategoriaDto.descricao
  //   ).catch(() => undefined);

  //   if (category) {
  //     throw new BadRequestException(
  //       `A descricao da categoria ${createCategoriaDto.descricao} ja existe`
  //     );
  //   }

  //   return this.categoriaRepository.save(createCategoriaDto);
  // }
    async createCategoria(
    createCategoriaDto: CreateCategoriaDto
  ): Promise<CategoriaEntity> {
    const category = await this.findCategoryByDescricao(
      createCategoriaDto.descricao
    ).catch(() => undefined);

    if (category) {
      throw new BadRequestException(
        `A descricao da categoria ${createCategoriaDto.descricao} ja existe`
      );
    }

    return this.categoriaRepository.save(createCategoriaDto);
  }

  async editCategoria(
    categoriaId: string,
    updateCategoriaDto: UpdateCategoriaDto
  ): Promise<CategoriaEntity> {
    const category = await this.findCodigo(categoriaId);

    return this.categoriaRepository.save({
      ...category,
      ...updateCategoriaDto,
    });
  }

  async deleteCategoria(categoriaId: string): Promise<DeleteResult> {
    const category = await this.findCodigo(categoriaId);

    if (category.posts?.length > 0) {
      throw new BadRequestException("Category with relations.");
    }

    return this.categoriaRepository.delete({ id: categoriaId });
  }
}
