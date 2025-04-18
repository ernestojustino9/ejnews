import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";
import slugify from "slugify";

@Entity({ name: "noticia" })
export class NoticiaEntity {
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

  @Column({ type: "boolean", default: false })
  publicado: boolean;

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
}
