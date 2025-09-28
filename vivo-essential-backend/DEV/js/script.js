document.addEventListener("DOMContentLoaded", function () {
  const currentYearElement = document.getElementById("currentYear");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  const loginForm = document.getElementById("loginForm");
  const errorMessageElement = document.getElementById("errorMessage");

  if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      if (errorMessageElement) {
        errorMessageElement.textContent = "";
        errorMessageElement.classList.add("hidden");
      }

      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");
      const email = emailInput.value;
      // Corrigido para corresponder ao backend, que espera 'password'
      const password = passwordInput.value; 

      if (!email || !password) {
        if (errorMessageElement) {
          errorMessageElement.textContent = "Por favor, preencha o email e a senha.";
          errorMessageElement.classList.remove("hidden");
        }
        return;
      }

      try {
        // Ajustado para o nome da variável ser 'password' e a rota ser /login
        const response = await fetch("http://localhost:3000/login", { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Garante que o backend receba 'email' e 'password'
          body: JSON.stringify({ email: email, password: password }), 
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Login bem-sucedido! Resposta do backend:", data);

          // Armazena o token e os dados do usuário (se o seu backend os enviar)
          if (data.access_token) {
            localStorage.setItem("accessToken", data.access_token);
          }
          if (data.user) {
            localStorage.setItem("userData", JSON.stringify(data.user));
          }

          // <<< MUDANÇA PRINCIPAL AQUI: LÓGICA DE REDIRECIONAMENTO DINÂMICO >>>
          
          // 1. Pega o perfil (role) do usuário que veio do backend
          //    (Estou assumindo que a resposta do backend é algo como: { user: { role: 'gestor' }, ... })
          const userRole = data.user ? data.user.role : null;
          
          let redirectUrl = "";

          // 2. Decide para qual URL redirecionar com base no perfil
          switch (userRole) {
            case 'gestor':
              redirectUrl = 'home_gestor.html';
              break;
            case 'buddy':
              redirectUrl = 'home_buddy.html';
              break;
            case 'newuser':
              redirectUrl = 'home_newuser.html';
              break;
            default:
              // Se o perfil não for reconhecido, mostra um erro.
              console.error("Perfil de usuário não reconhecido:", userRole);
              if (errorMessageElement) {
                errorMessageElement.textContent = "Seu perfil de usuário não foi reconhecido. Contate o suporte.";
                errorMessageElement.classList.remove("hidden");
              }
              return; // Para a execução para não redirecionar
          }
          
          // 3. Redireciona para a URL correta
          alert("Login bem-sucedido! Redirecionando...");
          window.location.href = redirectUrl;

        } else {
          // Trata erros do servidor (ex: senha errada)
          console.error("Falha no login. Status:", response.status, "Resposta:", data);
          if (errorMessageElement) {
            errorMessageElement.textContent = data.message || `Erro ${response.status}: Falha no login.`;
            errorMessageElement.classList.remove("hidden");
          }
        }
      } catch (error) {
        // Trata erros de rede (ex: servidor offline)
        console.error("Erro de rede ou ao tentar fazer login:", error);
        if (errorMessageElement) {
          errorMessageElement.textContent = "Erro de comunicação com o servidor. Tente novamente.";
          errorMessageElement.classList.remove("hidden");
        }
      }
    });
  }
});