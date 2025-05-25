import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity'; // Certifique-se que o caminho para UserEntity está correto

// Enum para os tipos de evento, para melhor organização e tipagem
export enum TipoEvento {
  REUNIAO_BUDDY = 'REUNIAO_BUDDY',
  REUNIAO_GESTOR = 'REUNIAO_GESTOR',
  FEEDBACK = 'FEEDBACK',
  ALINHAMENTO = 'ALINHAMENTO',
  TREINAMENTO = 'TREINAMENTO', // Adicionei um exemplo
  OUTRO = 'OUTRO',
}

// Enum para os status do evento
export enum StatusEvento {
  AGENDADO = 'AGENDADO',
  CONFIRMADO = 'CONFIRMADO', // Se precisar de confirmação dos convidados
  CANCELADO = 'CANCELADO',
  CONCLUIDO = 'CONCLUIDO',
  REAGENDADO = 'REAGENDADO', // Adicionei um exemplo
}

@Entity({ name: 'VE_EVENTOS' }) // Mapeia para a tabela VE_EVENTOS no Oracle
export class EventoEntity {
  @PrimaryGeneratedColumn({ name: 'ID_EVENTO', type: 'number' })
  idEvento: number;

  @Column({ name: 'TITULO', type: 'varchar2', length: 200, nullable: false })
  titulo: string;

  @Column({ name: 'DESCRICAO', type: 'varchar2', length: 1000, nullable: true })
  descricao: string | null;

  @Column({
    name: 'DATA_HORA_INICIO',
    type: 'timestamp with local time zone',
    nullable: false,
  })
  dataHoraInicio: Date;

  @Column({
    name: 'DATA_HORA_FIM',
    type: 'timestamp with local time zone',
    nullable: true,
  })
  dataHoraFim: Date | null;

  @Column({ name: 'ID_CRIADOR', type: 'number', nullable: false })
  idCriador: number;

  // Relacionamento com a UserEntity para o criador do evento
  // eager: false significa que o criador não será carregado automaticamente ao buscar um evento,
  // a menos que você especifique. Isso é geralmente bom para performance.
  @ManyToOne(() => UserEntity, {
    eager: false,
    nullable: false,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'ID_CRIADOR', referencedColumnName: 'idUsuario' })
  criador: UserEntity; // Usado para tipagem e funcionalidades do ORM

  // Para convidados:
  // Abordagem 1 (Simples, para MVP): Armazenar como uma string de IDs separados por vírgula.
  // @Column({ name: 'IDS_CONVIDADOS', type: 'varchar2', length: 500, nullable: true })
  // idsConvidados: string | null; // Ex: "2,3,5"
  // Abordagem 2 (Mais Robusta, para o futuro): Usar uma tabela de junção ManyToMany (Evento <-> Usuário)
  // Isso permitiria rastrear status de RSVP por convidado, etc.
  // Por agora, vamos omitir a coluna de convidados para simplificar a criação inicial da tabela e entidade.
  // Você pode adicionar isso em uma próxima iteração.

  @Column({
    name: 'TIPO_EVENTO',
    type: 'varchar2',
    length: 50,
    enum: TipoEvento,
    default: TipoEvento.OUTRO,
    nullable: false,
  })
  tipoEvento: TipoEvento;

  @Column({
    name: 'STATUS_EVENTO',
    type: 'varchar2',
    length: 50,
    enum: StatusEvento,
    default: StatusEvento.AGENDADO,
    nullable: false,
  })
  statusEvento: StatusEvento;

  @Column({
    name: 'LINK_REUNIAO',
    type: 'varchar2',
    length: 500,
    nullable: true,
  })
  linkReuniao: string | null;

  @CreateDateColumn({
    name: 'DATA_CRIACAO',
    type: 'timestamp with local time zone',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  dataCriacao: Date;

  @UpdateDateColumn({
    name: 'DATA_ATUALIZACAO',
    type: 'timestamp with local time zone',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  dataAtualizacao: Date | null;
}
