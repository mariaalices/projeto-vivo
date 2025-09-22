/*
 * V4.1 - Lógica de Tema (Dark por Padrão)
 * Alinhado ao visual 'segunda_tentativa'
 */
document.addEventListener('DOMContentLoaded', () => {
  const themeToggleButton = document.getElementById('themeToggleButton');
  const themeIcon = document.getElementById('themeIcon');
  const body = document.body;

  // PILAR 1: O tema padrão agora é 'dark' para corresponder ao V2
  const defaultTheme = 'dark';

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      body.classList.add('dark');
      if (themeIcon) themeIcon.textContent = '☀️'; // Sol para mudar para claro
      localStorage.setItem('theme', 'dark');
    } else {
      // light theme
      body.classList.remove('dark');
      if (themeIcon) themeIcon.textContent = '🌙'; // Lua para mudar para escuro
      localStorage.setItem('theme', 'light');
    }
  };

  // Carrega o tema salvo ou usa o padrão 'dark'
  let currentTheme = localStorage.getItem('theme') || defaultTheme;

  // Se não houver preferência salva, mas o S.O. preferir 'light', usamos 'light'
  if (
    !localStorage.getItem('theme') &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: light)').matches
  ) {
    currentTheme = 'light';
  }

  // Aplica o tema no carregamento da página
  applyTheme(currentTheme);

  // Adiciona o listener de clique
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
      const newTheme = body.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // Opcional: Observa mudanças no SO (se o usuário não tiver setado preferência)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(event.matches ? 'dark' : 'light');
    }
  });
});
