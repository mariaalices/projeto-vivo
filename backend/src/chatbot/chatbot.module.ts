import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';
import { AuthModule } from '../auth/auth.module'; // Importe o AuthModule

@Module({
  imports: [AuthModule], // Adicione aqui
  providers: [ChatbotService],
  controllers: [ChatbotController],
})
export class ChatbotModule {}
