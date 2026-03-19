/* ── SAMURIA TRAVELS – SHARED JS ── */

// ── Currency ──
const RATES = { KES: 1, USD: 0.0077, GBP: 0.0061 };
const SYMBOLS = { KES: 'KES', USD: '$', GBP: '£' };
let currentCurrency = localStorage.getItem('st_currency') || 'KES';

function setCurrency(cur) {
  currentCurrency = cur;
  localStorage.setItem('st_currency', cur);
  document.querySelectorAll('.cur-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.cur === cur);
  });
  document.querySelectorAll('[data-kes]').forEach(el => {
    const kes = parseInt(el.dataset.kes);
    const converted = Math.round(kes * RATES[cur]);
    const formatted = cur === 'KES'
      ? `KES ${converted.toLocaleString()}`
      : `${SYMBOLS[cur]}${converted.toLocaleString()}`;
    el.textContent = formatted;
  });
}

// ── Mobile Menu ──
function initNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // Currency buttons
  document.querySelectorAll('.cur-btn').forEach(btn => {
    btn.addEventListener('click', () => setCurrency(btn.dataset.cur));
  });

  // Active nav link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Init currency on load
  setCurrency(currentCurrency);
}

// ── Scroll reveal ──
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    obs.observe(el);
  });
}

// ── Toast notification ──
function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.style.cssText = `
    position:fixed;bottom:100px;left:50%;transform:translateX(-50%) translateY(20px);
    background:${type === 'success' ? '#29c765' : '#e74c3c'};
    color:${type === 'success' ? '#0a1a0e' : '#fff'};
    padding:14px 28px;border-radius:30px;font-family:'Outfit',sans-serif;
    font-weight:700;font-size:.9rem;z-index:9999;
    box-shadow:0 8px 24px rgba(0,0,0,.3);
    transition:opacity .4s,transform .4s;
  `;
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => {
    t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    t.style.opacity = '0'; t.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => t.remove(), 400);
  }, 3500);
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
});
