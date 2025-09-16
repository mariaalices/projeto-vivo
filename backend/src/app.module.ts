import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { EventosModule } from './eventos/eventos.module';
import { EventoEntity } from './entities/evento.entity';
import { ChatbotModule } from './chatbot/chatbot.module'; // Importação do novo módulo

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'oracle',
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        connectString: configService.get<string>('DB_CONNECT_STRING'),
        entities: [UserEntity, EventoEntity],
        synchronize: false,
        logging:
          configService.get<string>('NODE_ENV') === 'development'
            ? ['query', 'error']
            : ['error'],
      }),
    }),
    AuthModule,
    EventosModule,
    ChatbotModule, // Adicione o módulo aqui
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
