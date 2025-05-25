import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  ValidationPipe,
  UsePipes,
  HttpCode,
  HttpStatus,
  Get, // <<< Adicione Get
} from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedUser } from '../auth/jwt.strategy';

interface AuthenticatedRequestEvento extends globalThis.Request {
  user: AuthenticatedUser;
}

@Controller('eventos')
@UseGuards(AuthGuard('jwt'))
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async create(
    @Body() createEventoDto: CreateEventoDto,
    @Request() req: AuthenticatedRequestEvento,
  ) {
    const criadorId = req.user.idUsuario;
    return this.eventosService.create(createEventoDto, criadorId);
  }

  /**
   * Endpoint para listar todos os eventos do usuário autenticado.
   */
  @Get() // <<< Novo endpoint GET para /eventos
  async findAll(@Request() req: AuthenticatedRequestEvento) {
    const criadorId = req.user.idUsuario; // Pega o ID do usuário logado a partir do token
    return this.eventosService.findAllByCriador(criadorId);
  }

  // Outros endpoints (GET /eventos/:id, PUT /eventos/:id, DELETE /eventos/:id) virão aqui
}
