document.addEventListener('DOMContentLoaded', function () {
  // --- Script do Ano Dinâmico (se você já o tinha) ---
  const currentYearElement = document.getElementById('currentYear');
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
        errorMessageElement.textContent = ''; // Limpa mensagens de erro anteriores
        errorMessageElement.classList.add('hidden'); // Oculta o container de erro (Tailwind class)
      }

      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');

      if (!emailInput || !passwordInput) {
        console.error('Campos de email ou senha não encontrados no HTML!');
        if (errorMessageElement) {
          errorMessageElement.textContent = 'Erro interno na página. Tente novamente.';
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

      console.log('Enviando para o backend:', { email, senha }); // Log para debug

      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, senha: senha }),
        });

        const data = await response.json(); // Tenta parsear o JSON da resposta

        if (response.ok) {
          // Status HTTP 200-299
          console.log('Login bem-sucedido! Resposta do backend:', data);
          if (errorMessageElement) {
            errorMessageElement.textContent =
              'Login bem-sucedido! Token: ' + data.access_token.substring(0, 30) + '...';
            errorMessageElement.classList.remove('hidden');
            errorMessageElement.classList.remove('text-red-400', 'bg-red-900'); // Remove classes de erro
            errorMessageElement.classList.add('text-green-400', 'bg-green-900'); // Adiciona classes de sucesso
          }
          alert('Login bem-sucedido! Redirecionando...'); // Opcional: apenas para feedback visual rápido
          window.location.href = 'home_newuser.html'; // Redireciona para a tela de home criada

          // Aqui você pode armazenar o token e os dados do usuário no localStorage
          localStorage.setItem('accessToken', data.access_token);
          localStorage.setItem('userData', JSON.stringify(data.user));
          alert(
            'Login bem-sucedido! Token e dados do usuário armazenados. Verifique o console e o localStorage.'
          );
        } else {
          // Erros como 400, 401, 500
          console.error('Falha no login. Status:', response.status, 'Resposta:', data);
          if (errorMessageElement) {
            errorMessageElement.textContent =
              data.message || `Erro ${response.status}: Falha no login.`;
            errorMessageElement.classList.remove('hidden');
            errorMessageElement.classList.add('text-red-400', 'bg-red-900'); // Garante classes de erro
            errorMessageElement.classList.remove('text-green-400', 'bg-green-900');
          }
        }
      } catch (error) {
        console.error('Erro de rede ou ao tentar fazer login:', error);
        if (errorMessageElement) {
          errorMessageElement.textContent = 'Erro de comunicação com o servidor. Tente novamente.';
          errorMessageElement.classList.remove('hidden');
          errorMessageElement.classList.add('text-red-400', 'bg-red-900');
          errorMessageElement.classList.remove('text-green-400', 'bg-green-900');
        }
      }
    });
  }
});
