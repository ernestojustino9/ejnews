import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Like, Repository, UpdateResult } from "typeorm";
import { CategoriaService } from "src/categoria/categoria.service";
import { PostEntity } from "./entities/post.entity";
import { PostHistoricoEntity } from "src/posthistorico/entities/posthistorico.entity";
import { CountPosts } from "./dto/count-posts.dto";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(PostHistoricoEntity)
    private readonly postHistoricoRepository: Repository<PostHistoricoEntity>,
    private readonly categoriaService: CategoriaService
  ) {}

  async countPostsByCategoryId(): Promise<CountPosts[]> {
    return this.postRepository
      .createQueryBuilder("post")
      .select("post.categoriaId, COUNT(*) as total")
      .andWhere("post.publicado = :publicado", { publicado: true })
      .groupBy("post.categoriaId")
      .getRawMany();
  }
  // Buscar
  async findPost() {
    return await this.postRepository.find({
      order: {
        descricao: "DESC",
      },
      relations: ["user", "categoria"],
    });
  }
  //Buscar por id
  async findOnePost(id: string): Promise<PostEntity> {
    const noticia = await this.postRepository.findOne({
      where: {
        id: id,
      },
      relations: ["categoria", "user"],
    });
    if (!noticia) {
      throw new BadRequestException("noticia nao foi encontrado");
    }
    return noticia;
  }
  // HISTORICO
  async findAllHistroricoPost(): Promise<PostHistoricoEntity[]> {
    try {
      return await this.postHistoricoRepository.find({
        order: {
          acao: "DESC",
        },
        relations: ["post"], // Relacionamento especificado como uma string
      });
    } catch (error) {
      console.error("Erro ao buscar histórico de notícias:", error);
      throw new Error("Erro ao buscar histórico de notícias");
    }
  }
  //
  async findOneHistroricoPost(id: string) {
    try {
      const histroricoPost = await this.postHistoricoRepository.findOne({
        where: {
          id: id,
        },
        relations: ["post"],
      });
      return histroricoPost;
    } catch (error) {
      throw new HttpException(
        "A entidade histroricos dos posts não foi encontrado",
        HttpStatus.BAD_REQUEST
      );
    }
  }
  // Buscar
  async findPostPublicadoTrue(publicado: boolean) {
    return await this.postRepository.find({
      where: {
        publicado: (publicado = true),
      },
      order: {
        descricao: "DESC",
      },
      // relations: {
      //   user: true,
      // },
    });
  }
  //
  // async findBySlug(slug: string): Promise<PostEntity> {
  //   try {
  //     const post = await this.postRepository.findOne({
  //       where: {
  //         slug,
  //       },
  //       relations: ["user", "categoria"],
  //       select: {
  //         categoria: {
  //           id: true,
  //           descricao: true,
  //         },
  //         user: {
  //           id: true,
  //           nome: true,
  //           email: true,
  //         },
  //       },
  //     });
  //     return post;
  //   } catch (error) {
  //     throw new BadRequestException(
  //       `post com slug ${slug} nao foi encontrado`
  //     );
  //   }
  // }
  // NOTICIA RELACIONADO AO UM USUARIO
  // async getPostByUser(userId: string): Promise<PostEntity[]> {
  //   const perfilUser = await this.postRepository.find({
  //     where: {
  //       userId,
  //     },
  //     relations: {
  //       user: {
  //         noticias: true,
  //         comentarios: true,
  //         respostas: true,
  //       },
  //     },
  //   });
  //   if (!perfilUser) {
  //     throw new NotFoundException(
  //       "Nenhuma perfilUser encontrada para este usuário"
  //     );
  //   }
  //   return perfilUser;
  // }
  //NOTICIAS RECENTE
  async getRecentNews(limit: number): Promise<PostEntity[]> {
    return this.postRepository.find({
      where: {
        publicado: true,
      },
      order: { createdAt: "DESC" },
      take: limit,
    });
  }
  //ALTERAR A PUBLICACO
  async mudarEstadoParaTrue(id: string): Promise<PostEntity> {
    const noticiaPublicado = await this.postRepository.findOne({
      where: {
        id: id,
      },
      // relations: {
      //   user: true,
      // },
    });

    if (!noticiaPublicado) {
      throw new NotFoundException("Sua entidade não encontrada");
    }

    // Altere o estado para true
    noticiaPublicado.publicado = true;

    const publicado = await this.postRepository.save(noticiaPublicado);

    await this.registrarHistorico(
      noticiaPublicado,
      "PUBLICADO",
      "Noticia foi publicado."
    );

    // Salve a entidade alterada no banco de dados
    return publicado;
  }
  //
  async mudarEstadoParaFalse(id: string): Promise<PostEntity> {
    const noticiaPublicado = await this.postRepository.findOne({
      where: {
        id: id,
      },
      // relations: {
      //   user: true,
      // },
    });

    if (!noticiaPublicado) {
      throw new NotFoundException("Sua entidade não encontrada");
    }

    // Altere o estado para false
    noticiaPublicado.publicado = false;

    const naoPublicado = await this.postRepository.save(noticiaPublicado);

    await this.registrarHistorico(
      noticiaPublicado,
      "NÃO PUBLICADO",
      "Notícia não foi publicado."
    );

    // Salve a entidade alterada no banco de dados
    return naoPublicado;
  }
  // Buscar todas os noticia de uma categoria
  async getAllPostByCategoriaId(categoriaId: string): Promise<PostEntity[]> {
    return await this.postRepository.find({
      where: {
        categoriaId,
      },
    });
  }

  //
  // async create(
  //   createNoticiaDto: CreatePostDto,
  //   userId: UserEntity,
  //   imgURL: Express.Multer.File
  // ): Promise<PostEntity> {
  //   try {
  //     // Encontrar a categoria
  //     const categoria = await this.categoriaService.findCodigo(
  //       createNoticiaDto.categoriaId
  //     );

  //     const bucketName = "blog";
  //     const imgPath = `noticia/${Date.now()}_${imgURL.originalname}`;

  //     const { data, error } = await supabase.storage
  //       .from(bucketName)
  //       .upload(imgPath, imgURL.buffer);

  //     if (error) {
  //       console.error("Erro ao fazer upload da imagem:", error);
  //       throw new HttpException(
  //         "Erro ao fazer upload da imagem",
  //         HttpStatus.INTERNAL_SERVER_ERROR
  //       );
  //     }

  //     // Construir o link da imagem
  //     const imgLink = `https://xfowmvlqtxrrjrlkpijc.supabase.co/storage/v1/object/public/${bucketName}/${imgPath}`;

  //     // Criar uma nova entidade de notícia com o link da imagem
  //     const newNoticia = this.postRepository.create({
  //       ...createNoticiaDto,
  //       imgURL: imgLink, // Usando o link da imagem
  //     });

  //     // Associar a categoria e o usuário à notícia
  //     newNoticia.categoria = categoria;
  //     newNoticia.user = userId;

  //     // Salvar a notícia no banco de dados
  //     const noticia = await this.postRepository.save(newNoticia);

  //     // Registra no histórico
  //     await this.registrarHistorico(
  //       noticia,
  //       "CRIADA",
  //       "Notícia criada com sucesso."
  //     );

  //     return noticia;
  //   } catch (error) {
  //     throw new HttpException(
  //       "A entidade notícia não foi criada",
  //       HttpStatus.BAD_REQUEST
  //     );
  //   }
  // }

  // async update(
  //   id: string,
  //   updateNoticiaDto: UpdatePostDto,
  //   imgURL: Express.Multer.File
  // ): Promise<UpdateResult> {
  //   try {
  //     // Verificar se há uma nova imagem para fazer upload
  //     let imgPath: string | undefined;
  //     if (imgURL) {
  //       const bucketName = "blog"; //
  //       imgPath = `noticia/${Date.now()}_${imgURL.originalname}`;

  //       // Faça upload da nova imagem para o Supabase
  //       const { data, error } = await supabase.storage
  //         .from(bucketName)
  //         .upload(imgPath, imgURL.buffer);

  //       if (error) {
  //         console.error("Erro ao fazer upload da nova imagem:", error);
  //         throw new HttpException(
  //           "Erro ao fazer upload da nova imagem",
  //           HttpStatus.INTERNAL_SERVER_ERROR
  //         );
  //       }
  //     }

  //     // Atualizar a notícia no banco de dados
  //     const updateResult = await this.postRepository.update(id, {
  //       ...updateNoticiaDto,
  //       imgURL: imgPath || updateNoticiaDto.imgURL, // Usar o caminho da nova imagem se existir, senão manter o caminho da imagem existente
  //     });

  //     if (updateResult.affected === 0) {
  //       // Se nenhum registro foi afetado, a notícia com o ID fornecido não foi encontrada
  //       throw new HttpException("Notícia não encontrada", HttpStatus.NOT_FOUND);
  //     }

  //     // Obter a notícia atualizada
  //     const updatedNoticia = await this.postRepository.findOne({
  //       where: {
  //         id,
  //       },
  //     });

  //     // Registra no histórico
  //     await this.registrarHistorico(
  //       updatedNoticia,
  //       "ATUALIZADA",
  //       "Notícia atualizada com sucesso."
  //     );

  //     return updateResult;
  //   } catch (error) {
  //     throw new HttpException(
  //       "Falha ao atualizar a notícia",
  //       HttpStatus.BAD_REQUEST
  //     );
  //   }
  // }

  async deletePost(id: string) {
    await this.postHistoricoRepository.delete({ post: { id } });
    await this.postRepository.delete(id);
  }
  //Metodo de historico
  async registrarHistorico(
    post: PostEntity,
    acao: string,
    descricao: string
  ): Promise<void> {
    const historico = new PostHistoricoEntity();
    historico.post = post;
    historico.acao = acao;
    historico.descricao = descricao;
    await this.postHistoricoRepository.save(historico);
  }
}
