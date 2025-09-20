// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'DEV'),
    }),
    TypeOrmModule.forRoot({
      type: 'oracle', // Corrigido de 'postgres'
      host: process.env.DB_HOST || 'localhost', // Adiciona um valor padrão
      port: parseInt(process.env.DB_PORT || '1521'), // Porta padrão do Oracle
      username: process.env.DB_USERNAME || 'postgres', // Adiciona um valor padrão
      password: process.env.DB_PASSWORD || 'postgres', // Adiciona um valor padrão
      database: process.env.DB_DATABASE || 'db_vivo', // No Oracle, isso pode ser o Service Name ou SID
      entities: [UserEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
    ChatbotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
