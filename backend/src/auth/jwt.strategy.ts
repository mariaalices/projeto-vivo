import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserProfileType } from '../entities/user.entity';

// Interface para o payload REAL DENTRO do token JWT
export interface TokenPayload {
  // Renomeado de JwtOriginalPayload ou JwtPayload para clareza
  sub: number; // idUsuario
  email: string;
  tipoPerfil: UserProfileType;
  nomeCompleto: string;
  dataCadastro: Date;
  diasOfensiva: number;
  vivoCoins: number;
  telefone?: string | null;
  descricao?: string | null;
}

// Interface para o objeto que será anexado a req.user
export interface AuthenticatedUser {
  idUsuario: number;
  email: string;
  tipoPerfil: UserProfileType;
  nomeCompleto: string;
  dataCadastro: Date;
  diasOfensiva: number;
  vivoCoins: number;
  telefone?: string | null;
  descricao?: string | null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error(
        'FATAL_ERROR: JWT_SECRET não está definido nas variáveis de ambiente!',
      );
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  // Recebe o payload decodificado do token (que deve corresponder a TokenPayload)
  validate(payload: TokenPayload): AuthenticatedUser {
    // Mapeia o payload do token para a estrutura que queremos em req.user
    return {
      idUsuario: payload.sub,
      email: payload.email,
      tipoPerfil: payload.tipoPerfil,
      nomeCompleto: payload.nomeCompleto,
      dataCadastro: payload.dataCadastro,
      diasOfensiva: payload.diasOfensiva,
      vivoCoins: payload.vivoCoins,
      telefone: payload.telefone,
      descricao: payload.descricao,
    };
  }
}
