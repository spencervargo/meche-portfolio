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

// Certification modal logic
const certModal = document.getElementById('cert-modal');
const certModalTitle = document.getElementById('cert-modal-title');
const certModalContent = document.getElementById('cert-modal-content');
const certModalOpenLink = document.getElementById('cert-modal-open');
const certModalCloseBtn = document.querySelector('.modal-close');

let previouslyFocusedElement = null;

function openCertModal({ title, href }) {
  if (!certModal) return;
  previouslyFocusedElement = document.activeElement;
  certModal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  if (certModalTitle) certModalTitle.textContent = title || 'Certification';
  if (certModalContent) {
    certModalContent.innerHTML = '';
    const placeholder = document.createElement('div');
    placeholder.style.padding = '1rem';
    placeholder.innerHTML = `<p>This certification can be viewed using the button below.</p>`;
    certModalContent.appendChild(placeholder);
  }
  if (certModalOpenLink) {
    if (href) {
      certModalOpenLink.href = href;
      certModalOpenLink.removeAttribute('aria-disabled');
    } else {
      certModalOpenLink.href = '#';
      certModalOpenLink.setAttribute('aria-disabled', 'true');
    }
  }
  // Focus the close button for accessibility
  certModalCloseBtn?.focus();
}

function closeCertModal() {
  if (!certModal) return;
  certModal.setAttribute('hidden', '');
  document.body.style.overflow = '';
  if (previouslyFocusedElement && previouslyFocusedElement.focus) {
    previouslyFocusedElement.focus();
  }
}

certModalCloseBtn?.addEventListener('click', closeCertModal);

// Close on backdrop click
certModal?.addEventListener('click', (event) => {
  if (event.target === certModal) {
    closeCertModal();
  }
});

// Close on Escape
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && certModal && !certModal.hasAttribute('hidden')) {
    event.preventDefault();
    closeCertModal();
  }
});

// Wire up view buttons
document.querySelectorAll('.view-cert').forEach((button) => {
  button.addEventListener('click', () => {
    const title = button.getAttribute('data-cert-title') || 'Certification';
    const href = button.getAttribute('data-cert-href') || '';
    openCertModal({ title, href });
  });
});

