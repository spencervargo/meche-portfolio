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

function openCertModal({ title, href, imgSrc, imgAlt, pdfSrc, videoSrc }) {
  if (!certModal) return;
  previouslyFocusedElement = document.activeElement;
  certModal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  if (certModalTitle) certModalTitle.textContent = title || 'Certification';
  if (certModalContent) {
    certModalContent.innerHTML = '';
    if (videoSrc) {
      const mediaWrapper = document.createElement('div');
      mediaWrapper.className = 'modal-media';
      const videoEl = document.createElement('video');
      videoEl.src = videoSrc;
      videoEl.controls = true;
      videoEl.playsInline = true;
      videoEl.preload = 'metadata';
      videoEl.addEventListener('error', () => {
        mediaWrapper.innerHTML = '<p style="color: var(--muted);">Unable to load video.</p>';
      });
      mediaWrapper.appendChild(videoEl);
      certModalContent.appendChild(mediaWrapper);
    } else if (imgSrc) {
      const mediaWrapper = document.createElement('div');
      mediaWrapper.className = 'modal-media';
      const imageEl = document.createElement('img');
      imageEl.src = imgSrc;
      imageEl.alt = imgAlt || `${title} image`;
      imageEl.loading = 'eager';
      imageEl.decoding = 'async';
      imageEl.addEventListener('error', () => {
        mediaWrapper.innerHTML = '<p style="color: var(--muted);">Unable to load image.</p>';
      });
      mediaWrapper.appendChild(imageEl);
      certModalContent.appendChild(mediaWrapper);
    } else if (pdfSrc) {
      const mediaWrapper = document.createElement('div');
      mediaWrapper.className = 'modal-media';
      const iframeEl = document.createElement('iframe');
      iframeEl.src = pdfSrc;
      iframeEl.className = 'pdf-frame';
      iframeEl.setAttribute('title', `${title} document`);
      iframeEl.setAttribute('loading', 'eager');
      iframeEl.setAttribute('referrerpolicy', 'no-referrer');
      iframeEl.addEventListener('error', () => {
        mediaWrapper.innerHTML = '<p style="color: var(--muted);">Unable to load document.</p>';
      });
      mediaWrapper.appendChild(iframeEl);
      certModalContent.appendChild(mediaWrapper);
    } else {
      const placeholder = document.createElement('div');
      placeholder.style.padding = '1rem';
      placeholder.innerHTML = `<p>No media provided. Use Open in new tab if available.</p>`;
      certModalContent.appendChild(placeholder);
    }
  }
  if (certModalOpenLink) {
    const linkTarget = href || videoSrc || imgSrc || pdfSrc || '';
    if (linkTarget) {
      certModalOpenLink.href = linkTarget;
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
    // Support both data-cert-img and data-cert-png for convenience
    const imgSrc = button.getAttribute('data-cert-img') || button.getAttribute('data-cert-png') || '';
    const imgAlt = button.getAttribute('data-cert-img-alt') || '';
    const pdfSrc = button.getAttribute('data-cert-pdf') || '';
    const videoSrc = button.getAttribute('data-cert-video') || '';
    openCertModal({ title, href, imgSrc, imgAlt, pdfSrc, videoSrc });
  });
});

