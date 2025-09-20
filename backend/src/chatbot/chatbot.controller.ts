import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChatbotService } from './chatbot.service';
import { ChatbotRequestDto, ChatbotResponseDto } from './dto/chatbot.dto';
import { AuthenticatedUser } from '../auth/jwt.strategy';

interface AuthenticatedRequest extends globalThis.Request {
  user: AuthenticatedUser;
}

@Controller('chatbot')
@UseGuards(AuthGuard('jwt'))
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
)
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('message')
  async sendMessage(
    @Body() chatbotRequestDto: ChatbotRequestDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<ChatbotResponseDto> {
    const userId = req.user.idUsuario;
    const userProfile = req.user.tipoPerfil;

    return this.chatbotService.handleMessage(
      chatbotRequestDto.userMessage,
      userId,
      userProfile,
    );
  }
}
