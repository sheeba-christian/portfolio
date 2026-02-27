// ── BUBBLES ──
const bubbleContainer = document.getElementById('bubbles');
for (let i = 0; i < 18; i++) {
  const b = document.createElement('div');
  b.className = 'bubble';
  const size = Math.random() * 80 + 20;
  b.style.cssText = `
    width:${size}px; height:${size}px;
    left:${Math.random() * 100}%;
    animation-duration:${Math.random() * 20 + 15}s;
    animation-delay:${Math.random() * 15}s;
    opacity:${Math.random() * 0.3 + 0.05};
  `;
  bubbleContainer.appendChild(b);
}

// ── CUSTOM CURSOR ──
const cur = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx - 7 + 'px';
  cur.style.top = my - 7 + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  ring.style.left = rx - 20 + 'px';
  ring.style.top = ry - 20 + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .sk-card, .proj-card, .cert-card, .ic').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width = '60px';
    ring.style.height = '60px';
    cur.style.transform = 'scale(0.5)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width = '40px';
    ring.style.height = '40px';
    cur.style.transform = 'scale(1)';
  });
});

// ── SCROLL REVEAL ──
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .tl-item').forEach(el => revealObs.observe(el));

// ── SKILL BARS ──
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.sk-card').forEach((card, i) => {
        const lvl = card.dataset.level;
        const fill = card.querySelector('.sk-fill');
        setTimeout(() => {
          fill.style.width = lvl + '%';
        }, i * 120);
      });
      skillObs.disconnect();
    }
  });
}, { threshold: 0.3 });

const sg = document.getElementById('skillsGrid');
if (sg) skillObs.observe(sg);

// ── NAV ACTIVE HIGHLIGHT ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 220) current = s.id;
  });
  navLinks.forEach(a => {
    if (a.getAttribute('href') === '#' + current) {
      a.style.background = 'var(--pink)';
      a.style.color = '#fff';
    } else {
      a.style.background = '';
      a.style.color = '';
    }
  });
});
