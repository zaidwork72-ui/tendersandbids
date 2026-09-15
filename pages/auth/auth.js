document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-next]').forEach((button) => {
    button.addEventListener('click', () => {
      const next = button.dataset.next;
      if (next) {
        window.location.href = next;
      }
    });
  });

  document.querySelectorAll('.country-chip, .option-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('is-selected');
    });
  });

  document.querySelectorAll('.switch').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('is-on');
    });
  });

  document.querySelectorAll('.code-input').forEach((input, index, list) => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/g, '').slice(0, 1);
      if (input.value && index < list.length - 1) {
        list[index + 1].focus();
      }
    });

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace' && !input.value && index > 0) {
        list[index - 1].focus();
      }
    });
  });
});
