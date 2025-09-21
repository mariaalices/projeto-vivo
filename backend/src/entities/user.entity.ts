import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum UserProfileType {
  NOVO_COLABORADOR = 'NOVO_COLABORADOR',
  BUDDY = 'BUDDY',
  GESTOR = 'GESTOR',
}

@Entity({ name: 'VE_USUARIOS' }) // Nome da tabela
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'ID_USUARIO', type: 'number' }) // Corresponde à coluna e usa a sequência via default no BD
  idUsuario: number;

  @Column({
    name: 'EMAIL',
    type: 'varchar2',
    length: 255,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'SENHA_HASH',
    type: 'varchar2',
    length: 255,
    nullable: false,
    //select: false,
  })
  senhaHash: string;

  @Column({
    name: 'NOME_COMPLETO',
    type: 'varchar2',
    length: 300,
    nullable: false,
  })
  nomeCompleto: string;

  @Column({
    name: 'TIPO_PERFIL',
    type: 'varchar2',
    length: 50,
    enum: UserProfileType,
    nullable: false,
  })
  tipoPerfil: UserProfileType;

  @CreateDateColumn({ name: 'DATA_CADASTRO', type: 'date', nullable: false }) // Default SYSDATE será do BD
  dataCadastro: Date;

  @Column({
    name: 'STATUS_ATIVO',
    type: 'number',
    width: 1,
    default: 1,
    nullable: false,
  }) // NUMBER(1)
  statusAtivo: number;

  @Column({ name: 'TELEFONE', type: 'varchar2', length: 20, nullable: true })
  telefone: string | null;

  @Column({ name: 'DESCRICAO', type: 'varchar2', length: 500, nullable: true })
  descricao: string | null;

  @Column({
    name: 'DIAS_OFENSIVA',
    type: 'number',
    default: 0,
    nullable: false,
  })
  diasOfensiva: number;

  @Column({ name: 'VIVO_COINS', type: 'number', default: 0, nullable: false })
  vivoCoins: number;

  @Column({ name: 'ID_GESTOR', type: 'number', nullable: true })
  idGestor: number | null;

  @Column({ name: 'ID_BUDDY', type: 'number', nullable: true })
  idBuddy: number | null;
}
