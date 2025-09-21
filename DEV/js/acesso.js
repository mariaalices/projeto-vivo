/*
 * Pilar 2: Manutenibilidade
 * Lógica da página 'acessoinicial.html'
 */
document.addEventListener('DOMContentLoaded', () => {
  // --- LÓGICA DO MODAL DE NOTIFICAÇÃO ---
  // (Duplicado de home.js - Débito Técnico)
  const notifIcon = document.getElementById('notifIcon');
  const notifModal = document.getElementById('notifModal');

  // Pilar 4: Robustez
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

  // --- LÓGICA DO FORMULÁRIO DE NOVA SOLICITAÇÃO ---
  const formContainer = document.getElementById('form-solicitacao');
  const saveButton = document.getElementById('btn-salvar');
  const plataformaInput = document.getElementById('nome-plataforma');
  const motivoTextarea = document.getElementById('motivo-solicitacao');

  // Pilar 4: Robustez
  if (formContainer && saveButton && plataformaInput && motivoTextarea) {
    saveButton.addEventListener('click', () => {
      const dados = {
        plataforma: plataformaInput.value,
        motivo: motivoTextarea.value,
      };

      // Pilar 4: Logs
      console.log('Dados da solicitação (simulada):', dados);

      const mensagemDeConfirmacao = `
        <div class="text-center transition-all">
            <h2 class="text-2xl font-bold text-green-400 mb-3">✅ Sucesso!</h2>
            <p class="text-slate-300">Sua solicitação foi salva e será processada em breve.</p>
        </div>
      `;

      formContainer.innerHTML = mensagemDeConfirmacao;
    });
  }

  // --- LÓGICA DE VISUALIZAR SENHA (Refatorado) ---
  // Seleciona *todos* os botões que têm a classe 'btn-toggle-senha'
  const toggleButtons = document.querySelectorAll('.btn-toggle-senha');

  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Pega os IDs dos campos alvo (definidos no HTML via data-attributes)
      const loginId = btn.dataset.targetLogin;
      const senhaId = btn.dataset.targetSenha;

      const login = document.getElementById(loginId);
      const senha = document.getElementById(senhaId);

      // Pilar 4: Robustez
      if (!login || !senha) {
        console.error('Campos de login/senha não encontrados para o botão:', btn);
        return;
      }

      const isHidden = login.type === 'password';

      login.type = isHidden ? 'text' : 'password';
      senha.type = isHidden ? 'text' : 'password';

      btn.textContent = isHidden ? 'Ocultar Senha' : 'Visualizar Senha';
    });
  });
});
