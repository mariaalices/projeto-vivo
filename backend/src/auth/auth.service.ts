import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokenPayload, AuthenticatedUser } from './jwt.strategy'; // Importar AMBAS as interfaces

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
    // ... (código do validateUser como antes, ele já retorna Omit<UserEntity, 'senhaHash'>) ...
    // ... (os console.logs podem ser removidos se tudo estiver funcionando) ...
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

  login(user: Omit<UserEntity, 'senhaHash'>): {
    access_token: string;
    user: AuthenticatedUser;
  } {
    // Cria o payload para o JWT usando a estrutura de TokenPayload
    const payloadForToken: TokenPayload = {
      // Usando TokenPayload para o que vai DENTRO do token
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

    // O objeto 'user' retornado para o frontend pode seguir a estrutura AuthenticatedUser
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

    return {
      access_token: this.jwtService.sign(payloadForToken), // Assina o TokenPayload
      user: userToReturn, // Retorna o AuthenticatedUser
    };
  }

  async updateProfile(
    userId: number,
    updateProfileDto: any /* UpdateProfileDto */,
  ): Promise<Omit<UserEntity, 'senhaHash'>> {
    // ... (código do updateProfile como antes)
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
