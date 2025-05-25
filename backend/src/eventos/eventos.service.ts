import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventoEntity, StatusEvento } from '../entities/evento.entity';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(EventoEntity)
    private readonly eventoRepository: Repository<EventoEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(
    createEventoDto: CreateEventoDto,
    criadorId: number,
  ): Promise<EventoEntity> {
    const criador = await this.userRepository.findOne({
      where: { idUsuario: criadorId, statusAtivo: 1 },
    });
    if (!criador) {
      throw new NotFoundException(
        `Usuário criador com ID ${criadorId} não encontrado ou está inativo.`,
      );
    }

    const novoEvento = this.eventoRepository.create({
      ...createEventoDto,
      dataHoraInicio: new Date(createEventoDto.dataHoraInicio),
      dataHoraFim: createEventoDto.dataHoraFim
        ? new Date(createEventoDto.dataHoraFim)
        : null,
      idCriador: criadorId,
      statusEvento: StatusEvento.AGENDADO,
    });
    return this.eventoRepository.save(novoEvento);
  }

  /**
   * Encontra todos os eventos criados por um usuário específico.
   * @param criadorId O ID do usuário que criou os eventos.
   * @returns Uma lista de eventos.
   */
  async findAllByCriador(criadorId: number): Promise<EventoEntity[]> {
    return this.eventoRepository.find({
      where: { idCriador: criadorId },
      order: { dataHoraInicio: 'ASC' }, // Ordena os eventos pelo início, do mais antigo para o mais novo
    });
  }

  // Outros métodos (findOne, update, remove) virão aqui
  // Exemplo para findOne (obter um evento específico)
  /*
  async findOne(idEvento: number, criadorId: number): Promise<EventoEntity | null> {
    const evento = await this.eventoRepository.findOne({
      where: { idEvento, idCriador: criadorId }, // Garante que o usuário só possa ver seus próprios eventos
    });
    if (!evento) {
      throw new NotFoundException(`Evento com ID ${idEvento} não encontrado ou não pertence a este usuário.`);
    }
    return evento;
  }
  */
}
