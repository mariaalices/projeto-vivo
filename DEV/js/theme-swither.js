document.addEventListener('DOMContentLoaded', () => {
  const themeToggleButton = document.getElementById('themeToggleButton');
  const themeIcon = document.getElementById('themeIcon');
  const htmlElement = document.documentElement; // Pega o elemento <html>

  // Função para aplicar o tema e atualizar o ícone
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
      if (themeIcon) themeIcon.textContent = '☀️'; // Sol para mudar para claro
      localStorage.setItem('theme', 'dark');
    } else {
      // light theme
      htmlElement.classList.remove('dark');
      if (themeIcon) themeIcon.textContent = '🌙'; // Lua para mudar para escuro
      localStorage.setItem('theme', 'light');
    }
  };

  // Define o tema inicial
  // Se há um tema salvo, usa ele. Senão, usa 'dark' como padrão.
  const savedTheme = localStorage.getItem('theme');
  let currentTheme = savedTheme || 'dark'; // Padrão para escuro

  // Se não houver tema salvo E o sistema operacional preferir o modo claro, usa claro.
  // Isso é uma melhoria para respeitar a preferência inicial do SO se não houver nada salvo.
  if (
    !savedTheme &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: light)').matches
  ) {
    currentTheme = 'light';
  }

  applyTheme(currentTheme);

  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
      const newTheme = htmlElement.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // Opcional: Observa mudanças na preferência de tema do sistema operacional
  // Só muda se o usuário não tiver uma preferência explícita salva no localStorage
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(event.matches ? 'dark' : 'light');
    }
  });
});
