import { Injectable, Logger } from '@nestjs/common';
import { ChatbotResponseDto } from './dto/chatbot.dto';
import axios from 'axios';
import { ChatbotAiResponseDto } from './dto/chatbot-ai-response.dto';

@Injectable()
export class ChatbotService {
  private readonly logger = new Logger(ChatbotService.name);
  private readonly LLM_API_KEY = process.env.LLM_API_KEY;

  async handleMessage(
    userMessage: string,
    userId: number,
    userProfile: string,
  ): Promise<ChatbotResponseDto> {
    this.logger.log(
      `Mensagem recebida do usuário ${userId} (${userProfile}): "${userMessage}"`,
    );
    const context = `O usuário é um ${userProfile} (ID: ${userId}). Sua última mensagem é: "${userMessage}".`;

    try {
      const response = await axios.post<ChatbotAiResponseDto>(
        'https://api.llm.com/v1/chat',
        {
          model: 'gemini-pro',
          messages: [{ role: 'user', content: context }],
        },
        {
          headers: { Authorization: `Bearer ${this.LLM_API_KEY}` },
        },
      );

      const assistantMessage = response.data.choices[0].message.content;

      return { assistantMessage };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // O método 'isAxiosError' é o mais seguro para essa verificação
        this.logger.error(
          'Erro ao chamar a API da LLM:',
          error.response?.data || error.message,
        );
      } else if (error instanceof Error) {
        this.logger.error('Erro geral ao chamar a API da LLM:', error.message);
      } else {
        this.logger.error('Erro desconhecido ao chamar a API da LLM:', error);
      }
      return {
        assistantMessage:
          'Desculpe, estou com dificuldades para me conectar. Tente novamente mais tarde.',
      };
    }
  }
}
