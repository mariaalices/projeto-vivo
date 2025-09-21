/*
 * Pilar 2 & 4: Manutenibilidade e Robustez
 * Lógica da página 'home_buddy.html'.
 */
document.addEventListener('DOMContentLoaded', () => {
  // --- LÓGICA DA AVALIAÇÃO DO AFILIADO ---
  // (O Buddy avaliando o Novo Colaborador)
  const secaoAvaliacao = document.getElementById('secao-avaliacao-afiliado');

  // Pilar 4: Robustez
  if (secaoAvaliacao) {
    const emojiBtns = secaoAvaliacao.querySelectorAll('.emoji-btn');
    const motivoTextarea = secaoAvaliacao.querySelector('#motivo-avaliacao');
    const btnEnviar = secaoAvaliacao.querySelector('#btn-enviar-avaliacao');

    // Se algum elemento chave faltar, não execute
    if (!emojiBtns.length || !motivoTextarea || !btnEnviar) {
      console.warn('[DEV_MENTOR] Elementos da avaliação não encontrados.');
      return;
    }

    let avaliacaoSelecionada = null;

    emojiBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        emojiBtns.forEach((outroBtn) => {
          outroBtn.classList.remove('selecionado');
        });
        btn.classList.add('selecionado');
        avaliacaoSelecionada = btn.dataset.value;
        btnEnviar.disabled = false;
      });
    });

    btnEnviar.addEventListener('click', async () => {
      if (!avaliacaoSelecionada) return;

      const motivo = motivoTextarea.value.trim();
      // Em um app real, o ID viria do card do afiliado selecionado
      const afiliadoId = 'afiliado-mock-id';

      const novaAvaliacao = {
        nota: parseInt(avaliacaoSelecionada),
        motivo: motivo,
        afiliadoId: afiliadoId, // ID do usuário que está sendo avaliado
        data: new Date().toISOString(),
      };

      // Feedback de UI
      btnEnviar.disabled = true;
      btnEnviar.textContent = 'Enviando...';

      // Pilar 4: try...catch e Logs (Simulação de API)
      try {
        /* * MENTORIA: Aqui chamaremos o backend NestJS.
         * const response = await fetch('/api/buddy/avaliar', {
         * method: 'POST',
         * headers: { 'Content-Type': 'application/json' },
         * body: JSON.stringify(novaAvaliacao)
         * });
         * if (!response.ok) throw new Error('Falha na API');
         */
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula rede

        // Log de "Backend" (Simulado no console)
        console.log('[DEV_MENTOR - PILAR 4] Backend (NestJS) recebeu a avaliação do Buddy:');
        console.log(novaAvaliacao);

        // Mostra a mensagem de sucesso
        secaoAvaliacao.innerHTML = `
            <div class="text-center p-4">
                <h2 class="text-2xl font-bold text-green-400 mb-2">Obrigado!</h2>
                <p class="text-slate-300">Sua avaliação do Afiliado foi enviada.</p>
            </div>
        `;
      } catch (error) {
        console.error('[DEV_MENTOR - PILAR 4] Falha ao enviar avaliação!', error);
        btnEnviar.disabled = false;
        btnEnviar.textContent = 'Enviar Avaliação';
        alert('Erro ao enviar sua avaliação. Tente novamente.');
      }
    });
  }
});
