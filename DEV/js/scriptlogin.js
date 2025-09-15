document.addEventListener('DOMContentLoaded', function () {
  // --- Script do Ano Dinâmico para a página de login ---
  const currentYearElement = document.getElementById('currentYear'); // Espera um <span id="currentYear"> no footer do login.html
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // --- Lógica do Formulário de Login ---
  const loginForm = document.getElementById('loginForm');
  const errorMessageElement = document.getElementById('errorMessage');

  if (loginForm) {
    loginForm.addEventListener('submit', async function (event) {
      event.preventDefault(); // Impede o envio padrão do formulário

      if (errorMessageElement) {
        errorMessageElement.textContent = '';
        errorMessageElement.classList.add('hidden');
        // Garante que classes de sucesso sejam removidas em nova tentativa
        errorMessageElement.classList.remove('text-green-400', 'bg-green-900');
        errorMessageElement.classList.add('text-red-400', 'bg-red-900'); // Padrão para erro
      }

      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');

      if (!emailInput || !passwordInput) {
        console.error('Campos de email ou senha não encontrados no HTML da página de login!');
        if (errorMessageElement) {
          errorMessageElement.textContent =
            'Erro interno na página. IDs dos campos não encontrados.';
          errorMessageElement.classList.remove('hidden');
        }
        return;
      }

      const email = emailInput.value;
      const senha = passwordInput.value;

      if (!email || !senha) {
        if (errorMessageElement) {
          errorMessageElement.textContent = 'Por favor, preencha o email e a senha.';
          errorMessageElement.classList.remove('hidden');
        }
        return;
      }

      console.log('Enviando para o backend (login):', { email, senha });

      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          // URL do seu backend
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, senha: senha }),
        });

        const data = await response.json();

        if (response.ok) {
          // Status HTTP 200-299
          console.log('Login bem-sucedido! Resposta do backend:', data);

          localStorage.setItem('accessToken', data.access_token);
          localStorage.setItem('userData', JSON.stringify(data.user)); // Armazena o objeto user completo

          if (errorMessageElement) {
            errorMessageElement.textContent = 'Login bem-sucedido! Redirecionando...';
            errorMessageElement.classList.remove('hidden');
            errorMessageElement.classList.remove('text-red-400', 'bg-red-900');
            errorMessageElement.classList.add('text-green-400', 'bg-green-900');
          }

          setTimeout(() => {
            window.location.href = 'telainicial.html'; // Redireciona para telainicial.html
          }, 1000);
        } else {
          console.error('Falha no login. Status:', response.status, 'Resposta:', data);
          if (errorMessageElement) {
            errorMessageElement.textContent =
              data.message ||
              `Erro ${response.status}: Falha no login. Verifique suas credenciais.`;
            errorMessageElement.classList.remove('hidden');
          }
        }
      } catch (error) {
        console.error('Erro de rede ou ao tentar fazer login:', error);
        if (errorMessageElement) {
          errorMessageElement.textContent =
            'Erro de comunicação com o servidor. Tente novamente mais tarde.';
          errorMessageElement.classList.remove('hidden');
        }
      }
    });
  } else {
    console.error('Elemento do formulário de login (id="loginForm") não encontrado.');
  }
});
