const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
    root.classList.add('light');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        root.classList.toggle('light');
        const isLight = root.classList.contains('light');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

// Project filtering
const filterChips = document.querySelectorAll('.filters .chip');
const projectCards = document.querySelectorAll('.projects-grid .card');

filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.getAttribute('data-filter');
        projectCards.forEach(card => {
            const tags = card.getAttribute('data-tags') || '';
            const show = filter === 'all' || tags.includes(filter);
            card.style.display = show ? '' : 'none';
        });
    });
});

// Year in footer
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
