document.addEventListener('DOMContentLoaded', () => {
  const pinButton = document.getElementById('pin-sidebar-btn');
  const body = document.body;

  // Se não achar o botão ou o body, não faz nada.
  if (!pinButton || !body) {
    console.warn('Elementos do Pin da Sidebar não encontrados.');
    return;
  }

  const SIDEBAR_PINNED_KEY = 'sidebarPinned';

  /**
   * Aplica ou remove a classe 'sidebar-fixed' e salva no localStorage
   * @param {boolean} isPinned - True para fixar, false para desafixar.
   */
  const setPinnedState = (isPinned) => {
    if (isPinned) {
      body.classList.add('sidebar-fixed');
      pinButton.title = 'Desafixar menu';
      localStorage.setItem(SIDEBAR_PINNED_KEY, 'true');
    } else {
      body.classList.remove('sidebar-fixed');
      pinButton.title = 'Fixar menu';
      localStorage.setItem(SIDEBAR_PINNED_KEY, 'false');
    }
  };

  // --- LÓGICA PRINCIPAL ---

  // 1. Ao carregar a página, verifica o localStorage
  const isInitiallyPinned = localStorage.getItem(SIDEBAR_PINNED_KEY) === 'true';
  setPinnedState(isInitiallyPinned);

  // 2. Adiciona o evento de clique no botão
  pinButton.addEventListener('click', (e) => {
    // Impede que o clique se propague
    e.stopPropagation();

    // Inverte o estado atual
    const shouldPin = !body.classList.contains('sidebar-fixed');
    setPinnedState(shouldPin);
  });
});
