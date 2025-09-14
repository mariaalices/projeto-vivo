import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserProfileType } from '../entities/user.entity'; // Para tipar o payload

// Esta interface define a estrutura do payload que esperamos
// que seja decodificado do token JWT.
export interface JwtPayload {
  sub: number; // ID do usuário (o 'subject' do token)
  email: string;
  tipoPerfil: UserProfileType;
  nomeCompleto: string;
  // Outros campos que você queira incluir no token e ter acesso no request.user
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    // Se você fosse revalidar o usuário no banco a cada requisição,
    // você injetaria o AuthService aqui. Por enquanto, vamos manter simples.
    // private readonly authService: AuthService,
  ) {
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

  // Este método é chamado pelo PassportJS DEPOIS que ele verificou
  // a assinatura e a expiração do token.
  // O 'payload' é o objeto JSON decodificado do token.
  validate(payload: JwtPayload): any {
    // O que você retornar daqui será anexado ao objeto 'request'
    // pelo NestJS como 'req.user'.
    // Para o MVP, retornar o payload diretamente é suficiente.
    return {
      idUsuario: payload.sub,
      email: payload.email,
      tipoPerfil: payload.tipoPerfil,
      nomeCompleto: payload.nomeCompleto,
    };
  }
}
