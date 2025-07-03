import { Module } from "@nestjs/common";
import { PostModule } from "./post/post.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { CategoriaModule } from './categoria/categoria.module';
import { PosthistoricoModule } from './posthistorico/posthistorico.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      // host: process.env.DB_HOST,
      // port: parseInt(process.env.DB_PORT),
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_DATABASE,
      url: process.env.DATABASE_URL,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      synchronize: true,
    }),
    PostModule,
    CategoriaModule,
    PosthistoricoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
