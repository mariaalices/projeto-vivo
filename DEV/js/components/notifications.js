/*
 * Pilar 2 & 5: Manutenibilidade e Automação.
 * Lógica centralizada do modal de notificação.
 * Este script deve ser incluído em *todas* as páginas que têm o modal.
 */
document.addEventListener('DOMContentLoaded', () => {
  const notifIcon = document.getElementById('notifIcon');
  const notifModal = document.getElementById('notifModal');

  // Pilar 4: Robustez
  if (notifIcon && notifModal) {
    notifIcon.addEventListener('click', (e) => {
      // Impede que o clique no ícone feche o modal (caso o 'document' listener pegue)
      e.stopPropagation();
      notifModal.classList.toggle('hidden');
    });

    // Fecha o modal ao clicar em qualquer lugar fora dele
    document.addEventListener('click', (e) => {
      // Se o clique *não* foi no ícone E *não* foi dentro do modal
      if (!notifIcon.contains(e.target) && !notifModal.contains(e.target)) {
        notifModal.classList.add('hidden');
      }
    });

    // Simulação de carregamento de notificações (exemplo)
    // No futuro, isso virá do backend (NestJS).
    fetchNotifications();
  }
});

/*
 * Função de simulação para popular o modal.
 * No backend (NestJS), criaremos um endpoint para isso.
 * Assume que 'notifications.css' define a classe '.notif-item'.
 */
function fetchNotifications() {
  const notifModal = document.getElementById('notifModal');
  if (!notifModal) return;

  // Dados mocados (simulando uma resposta de API)
  const notifications = [
    {
      img: '../../imagens/avatar.png',
      sender: 'Sistema',
      message: 'Parece que o usuário XXXXX está terminando o curso, agende seu 1:1 com ele =)',
    },
    {
      img: '../../imagens/avatar.png',
      sender: 'Buddy',
      message: 'Oie, estou preocupado com certo onboard aqui, podemos conversar?',
    },
  ];

  if (notifications.length === 0) {
    notifModal.innerHTML =
      '<div class="p-4 text-center text-sm text-gray-500">Nenhuma nova notificação.</div>';
    return;
  }

  let html = '';
  notifications.forEach((notif) => {
    // Usamos a classe 'notif-item' que deve ser definida em 'notifications.css'
    html += `
      <div class="notif-item flex items-start gap-3 p-3">
        <img src="${notif.img}" alt="Avatar" class="w-10 h-10 rounded-full object-cover">
        <p class="text-sm leading-snug">
          <strong>${notif.sender}:</strong> ${notif.message}
        </p>
      </div>
    `;
  });
  notifModal.innerHTML = html;
}
