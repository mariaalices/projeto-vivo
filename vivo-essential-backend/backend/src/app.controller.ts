import { Controller, Get, Post, Body, Res, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { Response } from 'express';
import * as fs from 'fs';

class AvaliacaoDto {
  usuario_id: number;
  humor: number;
  comentario: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    console.log(
      'CONTROLLER ATUALIZADO E CARREGADO! Horário: ' +
        new Date().toLocaleTimeString(),
    );
  }

  // Servir a página principal
  @Get()
  getIndexPage(@Res() res: Response) {
    // Adicionar headers para compatibilidade com todos os browsers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    // Path correto: de backend/dist/ para vivo-essential-backend/DEV/
    const indexPath = join(__dirname, '..', '..', 'DEV', 'index.html');

    console.log('__dirname:', __dirname);
    console.log('Tentando servir arquivo em:', indexPath);
    console.log('Arquivo existe?', fs.existsSync(indexPath));

    if (fs.existsSync(indexPath)) {
      console.log('✅ Arquivo encontrado! Servindo:', indexPath);
      return res.sendFile(indexPath);
    } else {
      return res.send(`
        <h1>Vivo Essential Backend - Time Flow Makers 🚀</h1>
        <h2>Debug de Caminhos:</h2>
        <p><strong>__dirname:</strong> ${__dirname}</p>
        <p><strong>Tentando servir:</strong> ${indexPath}</p>
        <p><strong>Arquivo existe?</strong> ${fs.existsSync(indexPath)}</p>
        <hr>
        <p><strong>Estrutura esperada:</strong></p>
        <pre>vivo-essential-backend/
├── backend/src/     ← __dirname está aqui
└── DEV/index.html   ← arquivo deve estar aqui</pre>
      `);
    }
  }

  // API para teste
  @Get('api')
  getHello(): string {
    return this.appService.getHello();
  }

  // Servir arquivos CSS
  @Get('css/*')
  getCssFile(@Res() res: Response) {
    const filePath = res.req.url.replace('/css/', '');
    const fullPath = join(__dirname, '..', '..', 'DEV', 'css', filePath);

    if (fs.existsSync(fullPath)) {
      return res.sendFile(fullPath);
    } else {
      return res.status(404).send('CSS file not found');
    }
  }

  // Servir arquivos JS
  @Get('js/*')
  getJsFile(@Res() res: Response) {
    const filePath = res.req.url.replace('/js/', '');
    const fullPath = join(__dirname, '..', '..', 'DEV', 'js', filePath);

    if (fs.existsSync(fullPath)) {
      return res.sendFile(fullPath);
    } else {
      return res.status(404).send('JS file not found');
    }
  }

  // Servir imagens
  @Get('imagens/*')
  getImageFile(@Res() res: Response) {
    const filePath = res.req.url.replace('/imagens/', '');
    const fullPath = join(__dirname, '..', '..', 'DEV', 'imagens', filePath);

    if (fs.existsSync(fullPath)) {
      return res.sendFile(fullPath);
    } else {
      return res.status(404).send('Image file not found');
    }
  }

  // Servir páginas home específicas
  @Get('home_newuser.html')
  getHomeNewuser(@Res() res: Response) {
    const fullPath = join(__dirname, '..', '..', 'DEV', 'home_newuser.html');
    if (fs.existsSync(fullPath)) {
      return res.sendFile(fullPath);
    } else {
      return res.status(404).send('Home newuser page not found');
    }
  }

  @Get('home_buddy.html')
  getHomeBuddy(@Res() res: Response) {
    const fullPath = join(__dirname, '..', '..', 'DEV', 'home_buddy.html');
    if (fs.existsSync(fullPath)) {
      return res.sendFile(fullPath);
    } else {
      return res.status(404).send('Home buddy page not found');
    }
  }

  @Get('home_gestor.html')
  getHomeGestor(@Res() res: Response) {
    const fullPath = join(__dirname, '..', '..', 'DEV', 'home_gestor.html');
    if (fs.existsSync(fullPath)) {
      return res.sendFile(fullPath);
    } else {
      return res.status(404).send('Home gestor page not found');
    }
  }

  // Rota genérica para servir qualquer página HTML da plataforma
  @Get(':filename')
  getHtmlPage(@Param('filename') filename: string, @Res() res: Response) {
    // Só aceitar arquivos .html por segurança
    if (!filename.endsWith('.html')) {
      return res.status(404).send('Page not found');
    }

    const fullPath = join(__dirname, '..', '..', 'DEV', filename);

    console.log(`🔍 Tentando servir página: ${filename}`);
    console.log(`📁 Caminho completo: ${fullPath}`);

    if (fs.existsSync(fullPath)) {
      console.log(`✅ Página encontrada! Servindo: ${fullPath}`);
      return res.sendFile(fullPath);
    } else {
      console.log(`❌ Página não encontrada: ${fullPath}`);
      return res.status(404).send(`Page not found: ${filename}`);
    }
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
