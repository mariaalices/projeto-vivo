/*
 * PILAR 2: Manutenibilidade e Pilar 5: Automação
 * V5.4 - Lógica da Sidebar "Push/Pull"
 */
document.addEventListener('DOMContentLoaded', () => {
  const pinButton = document.getElementById('pin-sidebar-btn');
  const body = document.body;
  const SIDEBAR_PINNED_KEY = 'sidebarPinned'; // Chave para o localStorage

  if (!pinButton || !body) {
    console.warn('[DEV_MENTOR] Elementos da Sidebar (botão ou body) não encontrados.');
    return;
  }

  /**
   * Aplica o estado (fixo/expandido ou solto/recolhido)
   * @param {boolean} isPinned - True para fixar/expandir, false para soltar/recolher.
   */
  const setPinnedState = (isPinned) => {
    const icon = pinButton.querySelector('.icon');

    if (isPinned) {
      // Estado Expandido
      body.classList.add('sidebar-pinned');
      pinButton.title = 'Recolher menu';
      if (icon) icon.classList.add('pinned'); // Adiciona classe para o CSS girar
      localStorage.setItem(SIDEBAR_PINNED_KEY, 'true');
    } else {
      // Estado Recolhido
      body.classList.remove('sidebar-pinned');
      pinButton.title = 'Expandir menu';
      if (icon) icon.classList.remove('pinned'); // Remove classe para o CSS voltar
      localStorage.setItem(SIDEBAR_PINNED_KEY, 'false');
    }
  };

  // 1. Ao carregar, verifica o estado salvo
  const isInitiallyPinned = localStorage.getItem(SIDEBAR_PINNED_KEY) === 'true';
  setPinnedState(isInitiallyPinned);

  // 2. Adiciona o evento de clique no botão
  pinButton.addEventListener('click', (e) => {
    e.stopPropagation();
    // Inverte o estado atual
    const shouldPin = !body.classList.contains('sidebar-pinned');
    setPinnedState(shouldPin);
  });
});
