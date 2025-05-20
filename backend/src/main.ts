// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common'; // Importe ValidationPipe se ainda não fez

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  // Opção A: Permitir todas as origens (mais simples para desenvolvimento)
  app.enableCors();

  // Opção B: Configuração mais específica (melhor para produção, mas mais complexa para 'null' origin)
  /*
  app.enableCors({
    origin: true, // Pode ser um array de origens permitidas, ex: ['http://localhost:5500', 'http://127.0.0.1:5500']
                  // Para 'null' origin (arquivos locais), 'true' pode funcionar ou pode precisar de '*' (cuidado com '*')
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  */

  // Habilitar ValidationPipe globalmente (se você não fez isso em outro lugar)
  // Isso garante que seus DTOs sejam validados em todos os controllers.
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
