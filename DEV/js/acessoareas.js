/*
 * Pilar 2 & 4: Manutenibilidade e Robustez
 * Lógica da página 'acessoareas.html'.
 */
document.addEventListener('DOMContentLoaded', () => {
  const areaCards = document.querySelectorAll('.area-card');
  const btnContinuar = document.getElementById('btn-continuar');

  // --- Lógica de Seleção de Card (Pilar 1: Usabilidade) ---
  areaCards.forEach((card) => {
    card.addEventListener('click', () => {
      // Alterna o estado visual
      card.classList.toggle('selected');

      // Alterna o checkbox real (que está oculto)
      const checkbox = card.querySelector('input[type="checkbox"]');
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
      }
    });
  });

  // --- Lógica de Salvamento (Pilar 4: Robustez) ---
  if (btnContinuar) {
    btnContinuar.addEventListener('click', async () => {
      // 1. Coletar dados
      const selectedAreas = [];
      document.querySelectorAll('.area-card input[type="checkbox"]:checked').forEach((cb) => {
        selectedAreas.push(cb.value);
      });

      // Feedback de UI
      btnContinuar.disabled = true;
      btnContinuar.textContent = 'Salvando...';

      // 2. Simular chamada de API (Pilar 4: try...catch e Logs)
      try {
        /* * MENTORIA: Aqui é onde chamaremos nosso backend NestJS.
         * const response = await fetch('/api/onboarding/areas', {
         * method: 'POST',
         * headers: { 'Content-Type': 'application/json' },
         * body: JSON.stringify({ areas: selectedAreas })
         * });
         * if (!response.ok) throw new Error('Falha na API');
         */

        // Simula delay de rede de 1 segundo
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Log de "Backend" (Simulado no console)
        console.log('[DEV_MENTOR - PILAR 4] Backend (NestJS) recebeu a solicitação...');
        console.log('[DEV_MENTOR - PILAR 4] Salvando dados do usuário: ', { areas: selectedAreas });

        // Sucesso
        console.log('[DEV_MENTOR - PILAR 4] Dados salvos com sucesso.');

        // Redireciona para a próxima página
        // (Precisamos saber qual é a próxima página, vou usar um placeholder)
        window.location.href = 'buddy_cls_ti.html'; // <--- MUDAR ISSO
      } catch (error) {
        // Log de Erro (Pilar 4)
        console.error('[DEV_MENTOR - PILAR 4] Falha ao salvar áreas!', error);

        // Feedback de UI
        btnContinuar.disabled = false;
        btnContinuar.textContent = 'Continuar';
        // (Em um app real, mostraríamos um modal de erro, não um alert)
        alert('Erro ao salvar suas seleções. Tente novamente.');
      }
    });
  }
});
