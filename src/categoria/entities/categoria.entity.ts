import { PostEntity } from "src/post/entities/post.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "categoria" })
export class CategoriaEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100, nullable: false })
  descricao: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

  @OneToMany(() => PostEntity, (no) => no.categoria)
  posts: PostEntity[];
}
