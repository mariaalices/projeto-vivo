// backend/src/eventos/dto/create-evento.dto.ts (ou local similar)
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  MaxLength,
  IsEnum,
  IsArray,
  IsNumber,
  IsUrl,
} from 'class-validator';
import { TipoEvento } from '../../entities/evento.entity'; // Ajuste o caminho

export class CreateEventoDto {
  @IsString()
  @IsNotEmpty({ message: 'O título é obrigatório.' })
  @MaxLength(200)
  titulo: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  descricao?: string;

  @IsNotEmpty({ message: 'A data e hora de início são obrigatórias.' })
  @IsDateString(
    {},
    { message: 'Data e hora de início devem estar no formato ISO 8601.' },
  )
  dataHoraInicio: string; // Receber como string ISO 8601 do frontend

  @IsOptional()
  @IsDateString(
    {},
    { message: 'Data e hora de fim devem estar no formato ISO 8601.' },
  )
  dataHoraFim?: string;

  // @IsArray()
  // @IsNumber({}, { each: true })
  // @IsOptional()
  // idsConvidados?: number[]; // Array de IDs de usuários convidados

  @IsEnum(TipoEvento, { message: 'Tipo de evento inválido.' })
  @IsOptional() // Ou IsNotEmpty se for obrigatório
  tipoEvento?: TipoEvento = TipoEvento.OUTRO;

  @IsOptional()
  @IsUrl({}, { message: 'Link da reunião inválido.' })
  linkReuniao?: string;
}
