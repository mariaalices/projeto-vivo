import { IsString, IsNotEmpty } from 'class-validator';

export class ChatbotRequestDto {
  @IsString()
  @IsNotEmpty({ message: 'A mensagem do usuário não pode ser vazia.' })
  userMessage!: string; // Adicionado '!'
}

export class ChatbotResponseDto {
  @IsString()
  @IsNotEmpty({ message: 'A resposta do assistente não pode ser vazia.' })
  assistantMessage!: string; // Adicionado '!'
}
