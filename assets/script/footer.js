
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailInput = document.getElementById('newsletter-email');
      const note = document.getElementById('newsletter-note');

      const email = (emailInput?.value || '').trim();
      if (!email) {
        if (note) note.textContent = 'Please enter your email address.';
        return;
      }

      if (note) note.textContent = '🍾 Thank you for subscribing!';
      if (emailInput) emailInput.value = '';
    });
  });
})();

