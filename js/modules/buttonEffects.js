export function initButtonEffects() {
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach((button) => {
    button.addEventListener('pointermove', (event) => {
      const rect = button.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      button.style.setProperty('--mouse-x', `${x}%`);
      button.style.setProperty('--mouse-y', `${y}%`);
    }, { passive: true });

    button.addEventListener('pointerleave', () => {
      button.style.setProperty('--mouse-x', '50%');
      button.style.setProperty('--mouse-y', '50%');
    });
  });
}
