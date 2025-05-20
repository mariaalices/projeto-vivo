import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from './jwt.strategy'; // 1. Importe JwtPayload

// Opcional: Crie uma interface para tipar o objeto Request com a propriedade user
// Isso ajuda o TypeScript e o ESLint a entenderem req.user
interface AuthenticatedRequest extends globalThis.Request {
  // Ou apenas Request do Express se tiver os tipos do Express
  user: JwtPayload; // Ou o tipo que você retorna do validate da JwtStrategy
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async login(@Body() loginAuthDto: LoginAuthDto) {
    const user = await this.authService.validateUser(
      loginAuthDto.email,
      loginAuthDto.senha,
    );
    return this.authService.login(user);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  // 2. Modifique a tipagem do parâmetro 'req'
  getProfile(@Request() req: AuthenticatedRequest): JwtPayload {
    // Ou o tipo que você retorna do validate
    // Agora req.user é tipado como JwtPayload
    return req.user;
  }
}
