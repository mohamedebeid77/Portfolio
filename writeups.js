document.addEventListener('DOMContentLoaded', () => {
  const toolbar = document.querySelector('.notebook-toolbar');
  const filters = toolbar.querySelectorAll('button[data-topic]');
  const notes = document.querySelectorAll('.note-card');
  const count = document.getElementById('writeup-count');

  toolbar.hidden = false;
  filters.forEach(button => {
    button.addEventListener('click', () => {
      filters.forEach(filter => {
        const selected = filter === button;
        filter.classList.toggle('selected', selected);
        filter.setAttribute('aria-pressed', String(selected));
      });
      let visible = 0;
      notes.forEach(note => {
        note.hidden = button.dataset.topic !== 'all' && note.dataset.topic !== button.dataset.topic;
        if (!note.hidden) visible++;
      });
      count.textContent = `${visible} ${visible === 1 ? 'writeup' : 'writeups'}`;
    });
  });

  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const syncMenuState = () => menuToggle.setAttribute('aria-expanded', String(navLinks.classList.contains('open')));
  menuToggle.addEventListener('click', syncMenuState);
  navLinks.addEventListener('click', syncMenuState);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('open');
      syncMenuState();
      menuToggle.focus();
    }
  });
});
