/*
 * Pilar 2 & 4: Manutenibilidade e Robustez
 * Lógica da página 'to_na_ti.html'.
 */
document.addEventListener('DOMContentLoaded', () => {
  const checklistItems = document.querySelectorAll('.task-item');
  const btnContinuar = document.getElementById('btn-continuar-ti');
  const taskCounter = document.getElementById('task-counter');

  if (!checklistItems.length || !btnContinuar || !taskCounter) {
    console.warn('[DEV_MENTOR] Elementos essenciais (checklist, botão, contador) não encontrados.');
    return;
  }

  const totalTasks = checklistItems.length;
  let completedTasks = 0;

  function updateProgress() {
    completedTasks = 0;
    checklistItems.forEach((item) => {
      const checkbox = item.querySelector('input[type="checkbox"]');
      const statusText = item.querySelector('.status');

      if (checkbox.checked) {
        item.classList.add('completed');
        if (statusText) statusText.textContent = 'Concluído';
        completedTasks++;
      } else {
        item.classList.remove('completed');
        if (statusText) statusText.textContent = 'Pendente';
      }
    });

    // Atualiza o contador
    taskCounter.textContent = `${completedTasks} de ${totalTasks} tarefas concluídas`;

    // Habilita o botão 'Continuar' apenas se todas as tarefas estiverem prontas
    if (completedTasks === totalTasks) {
      btnContinuar.disabled = false;
      btnContinuar.textContent = 'Continuar';
      btnContinuar.classList.remove('bg-gray-500', 'cursor-not-allowed');
      btnContinuar.classList.add('bg-green-500', 'hover:bg-green-600');
    } else {
      btnContinuar.disabled = true;
      btnContinuar.textContent = 'Conclua todas as tarefas';
      btnContinuar.classList.add('bg-gray-500', 'cursor-not-allowed');
      btnContinuar.classList.remove('bg-green-500', 'hover:bg-green-600');
    }
  }

  // Adiciona listener para cada item (clicando no 'label' todo)
  checklistItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      // Evita duplo-clique se clicar direto no checkbox
      if (e.target.type === 'checkbox') return;

      const checkbox = item.querySelector('input[type="checkbox"]');
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
        // Dispara o evento 'change' manualmente para rodar a lógica
        checkbox.dispatchEvent(new Event('change'));
      }
    });

    // Adiciona o listener de 'change' ao checkbox
    const checkbox = item.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.addEventListener('change', updateProgress);
    }
  });

  // Estado inicial
  updateProgress();
});
