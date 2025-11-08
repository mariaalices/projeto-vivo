import { Injectable, UnauthorizedException } from '@nestjs/common'; // Certifique-se que UnauthorizedException está importado aqui
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Valida o usuário com base no email e senha.
   * @param email O email do usuário.
   * @param pass A senha em texto puro.
   * @returns O objeto do usuário sem o hash da senha se válido.
   * @throws UnauthorizedException se a validação falhar.
   */
  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<UserEntity, 'senhaHash'>> {
    console.log(`[AuthService] Tentando validar usuário: ${email}`);
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.senhaHash')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      console.log(`[AuthService] Usuário não encontrado: ${email}`);
      throw new UnauthorizedException(
        'Credenciais inválidas ou usuário inativo.',
      );
    }

    console.log(
      `[AuthService] Usuário encontrado: ${user.email}, STATUS_ATIVO: ${user.statusAtivo}`,
    );
    console.log(
      `[AuthService] Hash do banco para ${user.email}: ${user.senhaHash}`,
    );
    console.log(
      `[AuthService] Senha recebida do frontend para ${user.email}: ${pass}`,
    );

    if (user.statusAtivo !== 1) {
      console.log(`[AuthService] Usuário ${user.email} está inativo.`);
      throw new UnauthorizedException(
        'Credenciais inválidas ou usuário inativo.',
      );
    }

    const isPasswordMatching = await bcrypt.compare(pass, user.senhaHash);
    console.log(
      `[AuthService] Resultado da comparação de senha para ${user.email}: ${isPasswordMatching}`,
    );

    if (isPasswordMatching) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { senhaHash, ...result } = user;
      console.log(`[AuthService] Usuário ${user.email} validado com sucesso.`);
      return result;
    } else {
      console.log(`[AuthService] Senha não corresponde para ${user.email}.`);
      throw new UnauthorizedException(
        'Credenciais inválidas ou usuário inativo.',
      );
    }
  }

  // O método login permanece como antes (síncrono)
  login(user: Omit<UserEntity, 'senhaHash'>): {
    access_token: string;
    user: any;
  } {
    console.log(`[AuthService] Executando login para usuário: ${user.email}`);
    console.log(`[AuthService] Tipo de perfil do usuário: ${user.tipoPerfil}`);

    const payload: JwtPayload = {
      email: user.email,
      sub: user.idUsuario,
      tipoPerfil: user.tipoPerfil,
      nomeCompleto: user.nomeCompleto,
    };

    const result = {
      access_token: this.jwtService.sign(payload),
      user: {
        idUsuario: user.idUsuario,
        email: user.email,
        nomeCompleto: user.nomeCompleto,
        tipoPerfil: user.tipoPerfil,
      },
    };

    console.log(
      `[AuthService] Resultado do login:`,
      JSON.stringify(result, null, 2),
    );
    return result;
  }

  /*
  async findUserForJwtValidation(userId: number): Promise<Omit<UserEntity, 'senhaHash'> | undefined> {
    const user = await this.userRepository.findOne({ where: { idUsuario: userId, statusAtivo: 1 } });
    if (user) {
      const { senhaHash, ...result } = user;
      return result;
    }
    return undefined;
  }
  */
}
