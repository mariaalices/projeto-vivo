// Aguarda o HTML ser completamente carregado antes de executar qualquer script
document.addEventListener('DOMContentLoaded', function () {
  // --- SEÇÃO 1: LÓGICA PARA O FORMULÁRIO DE LOGIN ---
  // (Funciona apenas na página index.html)

  const loginForm = document.getElementById('loginForm');
  const errorMessageElement = document.getElementById('errorMessage');

  // A verificação 'if (loginForm)' garante que este código só tente rodar se o formulário de login existir na página.
  if (loginForm) {
    // Adiciona o "ouvinte" para o evento de envio do formulário
    loginForm.addEventListener('submit', async function (event) {
      event.preventDefault(); // Impede o recarregamento da página

      if (errorMessageElement) {
        errorMessageElement.textContent = '';
        errorMessageElement.classList.add('hidden');
      }

      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      const email = emailInput.value;
      const password = passwordInput.value;

      try {
        const response = await fetch('/auth/login', {
          // Acessa a rota /auth/login no backend
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, senha: password }),
        });

        const data = await response.json();

        if (response.ok) {
          // Lógica de redirecionamento dinâmico
          const userTipoPerfil = data.user ? data.user.tipoPerfil : null;
          let redirectUrl = '';

          switch (userTipoPerfil) {
            case 'GESTOR':
              redirectUrl = 'home_gestor.html';
              break;
            case 'BUDDY':
              redirectUrl = 'home_buddy.html';
              break;
            case 'NOVO_COLABORADOR':
              redirectUrl = 'home_newuser.html';
              break;
            default:
              if (errorMessageElement) {
                errorMessageElement.textContent = 'Perfil de usuário não reconhecido.';
                errorMessageElement.classList.remove('hidden');
              }
              return;
          }
          window.location.href = redirectUrl; // Redireciona para a página correta
        } else {
          // Mostra a mensagem de erro vinda do servidor (ex: "Email ou senha inválidos.")
          if (errorMessageElement) {
            errorMessageElement.textContent = data.message || 'Falha no login.';
            errorMessageElement.classList.remove('hidden');
          }
        }
      } catch (error) {
        console.error('Erro de comunicação com o servidor:', error);
        if (errorMessageElement) {
          errorMessageElement.textContent = 'Erro de comunicação com o servidor. Tente novamente.';
          errorMessageElement.classList.remove('hidden');
        }
      }
    });
  }

  // --- NOVA SEÇÃO 2: LÓGICA PARA BOTÕES DE LOGOUT ---
  // (Funciona em qualquer página que tenha um botão com a classe 'logout-btn')

  // Procura por todos os elementos que tenham a classe 'logout-btn'
  const logoutButtons = document.querySelectorAll('.logout-btn');

  // Adiciona a funcionalidade de clique para cada botão encontrado
  logoutButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Redireciona o navegador para a rota de logout no servidor
      window.location.href = '/logout';
    });
  });
});
