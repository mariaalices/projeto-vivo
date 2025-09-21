/*
 * Pilar 2: Manutenibilidade
 * Toda a lógica da página 'home' deve ficar aqui.
 * Envolvemos tudo em 'DOMContentLoaded' para garantir que o HTML
 * esteja pronto antes de tentarmos adicionar 'listeners'.
 */
document.addEventListener('DOMContentLoaded', () => {
  // --- LÓGICA DO MODAL DE NOTIFICAÇÃO ---
  const notifIcon = document.getElementById('notifIcon');
  const notifModal = document.getElementById('notifModal');

  // Pilar 4: Robustez (Verificar se os elementos existem)
  if (notifIcon && notifModal) {
    notifIcon.addEventListener('click', () => {
      notifModal.classList.toggle('hidden');
    });

    // Fecha o modal ao clicar fora
    document.addEventListener('click', (e) => {
      if (!notifIcon.contains(e.target) && !notifModal.contains(e.target)) {
        notifModal.classList.add('hidden');
      }
    });
  }

  // --- LÓGICA DA AVALIAÇÃO DO BUDDY ---
  const secaoAvaliacao = document.getElementById('secao-avaliacao-buddy');

  // Só executa se a seção de avaliação existir nesta página
  if (secaoAvaliacao) {
    // Simulação de banco de dados (variável local)
    let bancoDeDadosSimulado = [];

    // Seleção dos elementos
    const emojiBtns = secaoAvaliacao.querySelectorAll('.emoji-btn');
    const motivoTextarea = secaoAvaliacao.querySelector('#motivo-avaliacao');
    const btnEnviar = secaoAvaliacao.querySelector('#btn-enviar-avaliacao');

    let avaliacaoSelecionada = null;

    // Lógica para selecionar emoji
    emojiBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        emojiBtns.forEach((outroBtn) => {
          outroBtn.classList.remove('selecionado');
        });
        btn.classList.add('selecionado');
        avaliacaoSelecionada = btn.dataset.value;

        // Pilar 4: Robustez (Verificar se o botão existe)
        if (btnEnviar) {
          btnEnviar.disabled = false;
        }
      });
    });

    // Lógica para enviar a avaliação
    if (btnEnviar) {
      btnEnviar.addEventListener('click', () => {
        // Garantir que algo foi selecionado
        if (!avaliacaoSelecionada) return;

        const motivo = motivoTextarea ? motivoTextarea.value.trim() : '';

        const novaAvaliacao = {
          nota: parseInt(avaliacaoSelecionada),
          motivo: motivo,
          data: new Date().toISOString(),
        };

        bancoDeDadosSimulado.push(novaAvaliacao);

        // Log para debug (Pilar 4: Logs)
        console.log('Avaliação enviada (simulada):', novaAvaliacao);
        console.log('Estado do banco simulado:', bancoDeDadosSimulado);

        // Feedback visual para o usuário
        const mensagemSucessoHTML = `
          <div class="text-center">
              <h2 class="text-2xl font-bold text-green-400 mb-2">Obrigado!</h2>
              <p class="text-slate-300">Sua avaliação foi enviada com sucesso.</p>
          </div>
        `;
        secaoAvaliacao.innerHTML = mensagemSucessoHTML;
      });
    }
  }
});
