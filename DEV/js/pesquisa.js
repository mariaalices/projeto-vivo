/*
 * Pilar 2 & 4: Manutenibilidade e Robustez
 * Lógica da página 'pesquisa.html'.
 */
document.addEventListener('DOMContentLoaded', () => {
  const btnEnviar = document.getElementById('btn-enviar-pesquisa');
  const form = document.getElementById('form-pesquisa');

  // Pilar 4: Robustez (Verificar se os elementos existem)
  if (!btnEnviar || !form) {
    console.error('[DEV_MENTOR] Elementos essenciais (formulário, botão) não encontrados.');
    return;
  }

  btnEnviar.addEventListener('click', async () => {
    // 1. Coletar dados do formulário
    const formData = new FormData(form);
    const data = {
      // 'sentimento' é o 'name' do grupo de radio buttons
      sentimento: formData.get('sentimento'),
      // 'suporte_buddy' é o 'name' do outro grupo
      suporte_buddy: formData.get('suporte_buddy'),
      // 'feedback' é o 'name' do textarea
      feedback: formData.get('feedback'),
    };

    // Simples validação (Pilar 1: Usabilidade)
    if (!data.sentimento || !data.suporte_buddy) {
      alert('Por favor, responda às perguntas de múltipla escolha.');
      return;
    }

    // Feedback de UI
    btnEnviar.disabled = true;
    btnEnviar.textContent = 'Enviando...';

    // 2. Simular chamada de API (Pilar 4: try...catch e Logs)
    try {
      /* * MENTORIA: Aqui chamaremos o backend NestJS.
       * const response = await fetch('/api/onboarding/survey', {
       * method: 'POST',
       * headers: { 'Content-Type': 'application/json' },
       * body: JSON.stringify(data)
       * });
       * if (!response.ok) throw new Error('Falha na API');
       */

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula rede

      // Log de "Backend" (Simulado no console)
      console.log('[DEV_MENTOR - PILAR 4] Backend (NestJS) recebeu a solicitação de pesquisa...');
      console.log('[DEV_MENTOR - PILAR 4] Salvando dados da pesquisa: ', data);
      console.log('[DEV_MENTOR - PILAR 4] Pesquisa salva com sucesso.');

      // Redireciona para a próxima página (Etapa 9)
      window.location.href = 'preparacao.html';
    } catch (error) {
      // Log de Erro (Pilar 4)
      console.error('[DEV_MENTOR - PILAR 4] Falha ao salvar pesquisa!', error);

      // Feedback de UI
      btnEnviar.disabled = false;
      btnEnviar.textContent = 'Enviar Feedback';
      alert('Erro ao salvar sua pesquisa. Tente novamente.');
    }
  });
});
