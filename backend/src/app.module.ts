import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './entities/user.entity'; // UserEntity ainda é necessária aqui para o TypeOrmModule.forRootAsync
import { AuthModule } from './auth/auth.module';
import { EventosModule } from './eventos/eventos.module';
import { EventoEntity } from './entities/evento.entity';

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
        entities: [UserEntity, EventoEntity], // UserEntity é registrada aqui para o TypeORM global
        synchronize: false, //configService.get<string>('NODE_ENV') === 'development',
        logging:
          configService.get<string>('NODE_ENV') === 'development'
            ? ['query', 'error']
            : ['error'],
      }),
    }),
    AuthModule,
    EventosModule,
    // A importação e registro do AuthModule serão feitos pelo Nest CLI
  ],
  controllers: [AppController], // Apenas o AppController
  providers: [AppService], // Apenas o AppService
})
export class AppModule {}
