import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //https://etakos-shop-api.vercel.app/api/
  // http://localhost:3001/api
  app.setGlobalPrefix("api/");
  //
  const logger = new Logger();
  //
  const config = new DocumentBuilder()
    .setTitle("API")
    .setDescription("Gerando Documentação")
    .setVersion("1.0")
    .addTag("Etakos Shop")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  //Validacao
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  //Cors
  //Cors
  app.enableCors({
    origin: "*",
    allowedHeaders: "*",
    exposedHeaders: ["Authorization"],
    methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
    credentials: true,
  });
  //
  await app.listen(process.env.DB_PORT ?? 3001);
  logger.log(`Servidor esta rodando na porta http://localhost:3001/api/`);
}
bootstrap();
