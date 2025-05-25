// backend/src/eventos/eventos.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoEntity } from '../entities/evento.entity';
import { UserEntity } from '../entities/user.entity'; // Importe UserEntity aqui também
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventoEntity, UserEntity]), // <<< Adicione UserEntity aqui
    AuthModule,
  ],
  providers: [EventosService],
  controllers: [EventosController],
})
export class EventosModule {}
