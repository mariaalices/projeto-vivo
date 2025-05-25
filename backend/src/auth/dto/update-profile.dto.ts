import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  //Matches,
  //IsPhoneNumber,
} from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString({ message: 'O nome completo deve ser uma string.' })
  @MinLength(3, { message: 'O nome completo deve ter no mínimo 3 caracteres.' })
  @MaxLength(150, {
    message: 'O nome completo deve ter no máximo 150 caracteres.',
  })
  nomeCompleto?: string;

  @IsOptional()
  // @IsPhoneNumber('BR') // Requer instalação de 'libphonenumber-js'. Pode simplificar por enquanto.
  @IsString()
  @MaxLength(20, { message: 'O telefone deve ter no máximo 20 caracteres.' })
  telefone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'A descrição deve ter no máximo 500 caracteres.' })
  descricao?: string;

  // Campos de senha podem ser adicionados aqui depois para a funcionalidade de mudança de senha
  // @IsOptional()
  // @MinLength(6, { message: 'A nova senha deve ter no mínimo 6 caracteres.'})
  // novaSenha?: string;

  // @IsOptional()
  // senhaAtual?: string; // Para confirmar a identidade ao mudar a senha
}
