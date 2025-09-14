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

@Entity({ name: 'VE_USUARIOS' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'ID_USUARIO', type: 'number' })
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
    select: false,
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

  @CreateDateColumn({
    name: 'DATA_CADASTRO',
    type: 'date',
    default: () => 'SYSDATE',
    nullable: false,
  })
  dataCadastro: Date;

  @Column({
    name: 'STATUS_ATIVO',
    type: 'number',
    width: 1,
    default: 1,
    nullable: false,
  })
  statusAtivo: number;
}
