// 1. Importe 'Post' e 'Body' para lidar com a nova rota
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

// 2. (Opcional, mas recomendado) Crie uma classe para definir o formato dos dados que chegam.
// Isso garante que seu código seja mais seguro e fácil de entender.
class AvaliacaoDto {
  usuario_id: number;
  humor: number;
  comentario: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    console.log('CONTROLLER ATUALIZADO E CARREGADO! Horário: ' + new Date().toLocaleTimeString());
  }
  
  // Este método antigo continua aqui, sem problemas.
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // ==================================================================
  // ▼▼▼ 3. ADICIONE ESTE NOVO MÉTODO PARA RECEBER A AVALIAÇÃO ▼▼▼
  // ==================================================================

  /**
   * O decorador @Post('/avaliacoes') define que este método aceita requisições do tipo POST
   * para a rota '/avaliacoes'.
   */
  @Post('avaliacoes')
  /**
   * O decorador @Body() pega todo o corpo da requisição (os dados JSON que o frontend enviou)
   * e os coloca no parâmetro 'dadosDaAvaliacao'.
   */
  criarAvaliacao(@Body() dadosDaAvaliacao: AvaliacaoDto) {
    // Apenas para vermos no terminal do backend se os dados chegaram corretamente
    console.log('Dados da avaliação recebidos no backend:', dadosDaAvaliacao);

    // --- LÓGICA FUTURA ---
    // Aqui é onde você chamaria o seu AppService para, de fato,
    // salvar esses dados no banco de dados.
    // Ex: return this.appService.salvar(dadosDaAvaliacao);

    // Retorna uma mensagem de sucesso para o frontend
    return {
      message: 'Avaliação recebida com sucesso pelo servidor NestJS!',
      dataRecebida: dadosDaAvaliacao,
    };
  }
}
