// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity, UserProfileType } from '../entities/user.entity'; // Importe UserProfileType
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokenPayload, AuthenticatedUser } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<UserEntity, 'senhaHash'>> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.senhaHash')
      .where('user.email = :email', { email })
      .getOne();

    if (!user || user.statusAtivo !== 1) {
      throw new UnauthorizedException(
        'Credenciais inválidas ou usuário inativo.',
      );
    }

    const isPasswordMatching = await bcrypt.compare(pass, user.senhaHash);
    if (!isPasswordMatching) {
      throw new UnauthorizedException(
        'Credenciais inválidas ou usuário inativo.',
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senhaHash, ...result } = user;
    return result;
  }

  // Modificação aqui:
  login(user: Omit<UserEntity, 'senhaHash'>): {
    access_token: string;
    user: AuthenticatedUser;
    redirectUrl?: string; // Adicionado para a URL opcional
  } {
    const payloadForToken: TokenPayload = {
      sub: user.idUsuario,
      email: user.email,
      tipoPerfil: user.tipoPerfil,
      nomeCompleto: user.nomeCompleto,
      dataCadastro: user.dataCadastro,
      diasOfensiva: user.diasOfensiva,
      vivoCoins: user.vivoCoins,
      telefone: user.telefone,
      descricao: user.descricao,
    };

    const userToReturn: AuthenticatedUser = {
      idUsuario: user.idUsuario,
      email: user.email,
      tipoPerfil: user.tipoPerfil,
      nomeCompleto: user.nomeCompleto,
      dataCadastro: user.dataCadastro,
      diasOfensiva: user.diasOfensiva,
      vivoCoins: user.vivoCoins,
      telefone: user.telefone,
      descricao: user.descricao,
    };

    // Lógica para definir a URL de redirecionamento
    let redirectUrl: string | undefined;
    if (user.tipoPerfil === UserProfileType.NOVO_COLABORADOR) {
      redirectUrl = '/telainicial-novo-colaborador.html';
    } else {
      // Você pode definir outras URLs para outros perfis aqui
      redirectUrl = '/telainicial.html';
    }

    return {
      access_token: this.jwtService.sign(payloadForToken),
      user: userToReturn,
      redirectUrl, // Retornando a URL de redirecionamento
    };
  }

  async updateProfile(
    userId: number,
    updateProfileDto: any,
  ): Promise<Omit<UserEntity, 'senhaHash'>> {
    const user = await this.userRepository.findOne({
      where: { idUsuario: userId },
    });
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }
    Object.assign(user, updateProfileDto);
    await this.userRepository.save(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senhaHash, ...result } = user;
    return result;
  }
}
