import { PostEntity } from "src/post/entities/post.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from "typeorm";

@Entity("postHistorico")
export class PostHistoricoEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  acao: string;

  @Column()
  descricao: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  dataHora: Date;

  @ManyToOne(() => PostEntity, (post) => post.postsHistoricos)
  post: PostEntity;
}
