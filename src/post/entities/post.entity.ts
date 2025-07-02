import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";
// import { UserEntity } from "src/user/entity/user.entity";

@Entity({ name: "post" })
export class PostEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  imgURL: string;

  @Column({ nullable: false })
  titulo: string;

  @Column({ nullable: true })
  linkGit: string;

  @Column({ nullable: true })
  linkSite: string;

  @Column({ type: "text" })
  descricao: string;

  //   @Column({ nullable: false })
  //   userId: string;
  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

  //   @ManyToOne(() => UserEntity, (user) => user.projectos)
  //   @JoinColumn()
  //   user: UserEntity;
}
