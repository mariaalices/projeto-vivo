/*
 * Pilar 2 & 4: Manutenibilidade e Robustez
 * Lógica da página 'preparacao.html'.
 * Esta é a etapa final do fluxo.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Pilar 4: Robustez e Lógica de Negócio
  // Assim que o usuário "pousa" (lands) nesta página,
  // informamos ao backend que ele completou o fluxo.
  markOnboardingAsComplete();
});

/*
 * Função para "fechar" o onboarding no backend.
 */
async function markOnboardingAsComplete() {
  // (Em um app real, pegaríamos o ID do usuário da sessão/token)
  const userId = 'user-id-mock';
  const statusElement = document.getElementById('completion-status');

  // Log de "Frontend" (Simulado no console)
  console.log(
    `[DEV_MENTOR - PILAR 4] Etapa 9 alcançada. Enviando 'onboarding_complete' para o backend...`
  );
  if (statusElement) statusElement.textContent = 'Status: Sincronizando...';

  // 2. Simular chamada de API (Pilar 4: try...catch e Logs)
  try {
    /* * MENTORIA: Aqui chamaremos o backend NestJS.
     * const response = await fetch('/api/onboarding/complete', {
     * method: 'POST',
     * headers: { 'Content-Type': 'application/json' },
     * body: JSON.stringify({ userId: userId })
     * });
     * if (!response.ok) throw new Error('Falha na API');
     */

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula rede

    // Log de "Backend" (Simulado no console)
    console.log('[DEV_MENTOR - PILAR 4] Backend (NestJS) recebeu a flag "onboarding_complete".');
    console.log(
      '[DEV_MENTOR - PILAR 4] Status do usuário [ID: user-id-mock] atualizado para "Concluído".'
    );

    // Feedback de UI (Pilar 1: Usabilidade)
    if (statusElement) {
      statusElement.textContent = 'Status: Concluído (Sincronizado com o sistema)';
      statusElement.classList.remove('text-yellow-400');
      statusElement.classList.add('text-green-400');
    }
  } catch (error) {
    // Log de Erro (Pilar 4)
    console.error('[DEV_MENTOR - PILAR 4] Falha ao marcar onboarding como completo!', error);

    // Feedback de UI em caso de erro
    if (statusElement) {
      statusElement.textContent = 'Erro ao sincronizar. Seu progresso local está salvo.';
      statusElement.classList.remove('text-yellow-400');
      statusElement.classList.add('text-red-400');
    }
  }
}
