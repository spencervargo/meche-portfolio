// Mobile navigation toggle
const navToggleButton = document.querySelector('.nav-toggle');
const navElement = document.getElementById('site-nav');
if (navToggleButton && navElement) {
  navToggleButton.addEventListener('click', () => {
    const isOpen = navElement.classList.toggle('open');
    navToggleButton.setAttribute('aria-expanded', String(isOpen));
  });
}

// Close nav when clicking a link (mobile)
navElement?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    if (navElement.classList.contains('open')) {
      navElement.classList.remove('open');
      navToggleButton?.setAttribute('aria-expanded', 'false');
    }
  });
});

// Dynamic year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = String(new Date().getFullYear());
}

