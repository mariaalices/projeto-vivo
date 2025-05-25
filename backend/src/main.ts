// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common'; // Certifique-se que está importado

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: true, // Permite a origem da requisição (incluindo 'null' em alguns casos)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization', // Adicione Authorization se for usar
    credentials: true,
  }); // <<<< ESTA LINHA É CRUCIAL E DEVE ESTAR ATIVA

  // Habilitar ValidationPipe globalmente (recomendado)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') || 3000;

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap().catch((err) => {
  console.error('Failed to bootstrap the application', err);
  process.exit(1);
});
