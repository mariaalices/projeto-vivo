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
  @PrimaryGeneratedColumn({ name: 'ID_USUARIO' })
  idUsuario: number;

  @Column({
    name: 'EMAIL',
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'SENHA_HASH',
    type: 'varchar',
    length: 255,
    nullable: false,
    select: false,
  })
  senhaHash: string;

  @Column({
    name: 'NOME_COMPLETO',
    type: 'varchar',
    length: 300,
    nullable: false,
  })
  nomeCompleto: string;

  @Column({
    name: 'TIPO_PERFIL',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  tipoPerfil: UserProfileType;

  @CreateDateColumn({
    name: 'DATA_CADASTRO',
    nullable: false,
  })
  dataCadastro: Date;

  @Column({
    name: 'STATUS_ATIVO',
    type: 'integer',
    default: 1,
    nullable: false,
  })
  statusAtivo: number;
}
