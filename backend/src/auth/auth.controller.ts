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
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserEntity } from '../entities/user.entity';
import { AuthenticatedUser } from './jwt.strategy';

interface AuthenticatedRequest extends globalThis.Request {
  user: AuthenticatedUser;
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
  getProfile(@Request() req: AuthenticatedRequest): AuthenticatedUser {
    return req.user;
  }

  @Patch('profile')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      skipMissingProperties: true,
    }),
  )
  async updateProfile(
    @Request() req: AuthenticatedRequest,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<Omit<UserEntity, 'senhaHash'>> {
    const userId = req.user.idUsuario;
    return this.authService.updateProfile(userId, updateProfileDto);
  }
}
