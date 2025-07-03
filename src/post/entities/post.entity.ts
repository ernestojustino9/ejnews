import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";
// import { UserEntity } from "src/user/entity/user.entity";
import slugify from "slugify";
import { CategoriaEntity } from "src/categoria/entities/categoria.entity";
import { PostHistoricoEntity } from "src/posthistorico/entities/posthistorico.entity";
// import { CategoriaEntity } from "src/categoria/entity/categoria.entity";
// import { ComentarioEntity } from "src/comentario/entity/comentario.entity";
// import { PostHistoricoEntity } from "src/noticiahistorico/entities/noticiahistorico.entity";

@Entity({ name: "post" })
export class PostEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  imgURL: string;

  @Column({ type: "text", nullable: false })
  slug: string;

  @Column({ nullable: false })
  titulo: string;

  @Column({ type: "text" })
  descricao: string;

  @Column({ nullable: false })
  categoriaId: string;

  @Column({ type: "boolean", default: false })
  publicado: boolean;

  @Column({ nullable: false })
  userId: string;

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug = slugify(this.titulo.substring(0, 20), {
      lower: true,
      replacement: "_",
    });
  }

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

  @ManyToOne(() => CategoriaEntity, (categoria) => categoria.posts, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  categoria: CategoriaEntity;

  @OneToMany(() => PostHistoricoEntity, (historico) => historico.post)
  postsHistoricos: PostHistoricoEntity[];

  //   @ManyToOne(() => UserEntity, (user) => user.noticias)
  //   @JoinColumn()
  //   user: UserEntity;

  //   @OneToMany(() => ComentarioEntity, (comentario) => comentario.noticia)
  //   comentarios: ComentarioEntity[];
}
