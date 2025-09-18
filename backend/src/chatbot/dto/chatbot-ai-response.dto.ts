// backend/src/chatbot/dto/chatbot-ai-response.dto.ts

import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MessageDto {
  @IsString()
  content: string;
}

class ChoiceDto {
  @ValidateNested()
  @Type(() => MessageDto)
  message: MessageDto;
}

export class ChatbotAiResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChoiceDto)
  choices: ChoiceDto[];
}
