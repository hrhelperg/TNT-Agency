/* ================================================================
   TNT AGENCY — script.js
   ================================================================ */

/* ----------------------------------------------------------------
   INTERSECTION OBSERVER — Scroll fade-in (.fi elements)
   ---------------------------------------------------------------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('vis');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fi').forEach(el => io.observe(el));

/* ----------------------------------------------------------------
   STICKY HEADER
   ---------------------------------------------------------------- */
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ----------------------------------------------------------------
   HAMBURGER / MOBILE NAV
   ---------------------------------------------------------------- */
const burger    = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');

if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* Close on Escape key */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && burger.classList.contains('open')) {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ----------------------------------------------------------------
   SMOOTH SCROLL (anchor links)
   ---------------------------------------------------------------- */
document.addEventListener('click', e => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute('href').slice(1);
  const target = document.getElementById(id);
  if (target) {
    e.preventDefault();
    const headerH = header ? header.offsetHeight : 80;
    const y = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
});

/* ----------------------------------------------------------------
   CONTACT FORM — client-side validation + submission feedback
   ---------------------------------------------------------------- */
const form       = document.getElementById('contactForm');
const submitBtn  = document.getElementById('submitBtn');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();

    /* Basic validation */
    if (!name || !email || !message) {
      showFormMsg('Please fill in all required fields.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFormMsg('Please enter a valid email address.', 'error');
      return;
    }

    /* Submit state */
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        showFormMsg('Message sent! We\'ll be in touch within 24 hours.', 'success');
        submitBtn.textContent = 'Sent ✓';
      } else {
        throw new Error('Server error');
      }
    } catch {
      showFormMsg('Something went wrong. Please email us directly at hello@tntgency.org', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}

function showFormMsg(text, type) {
  /* Remove any existing message */
  const existing = form.querySelector('.form-msg');
  if (existing) existing.remove();

  const msg = document.createElement('p');
  msg.className = 'form-msg';
  msg.textContent = text;
  msg.style.cssText = `
    font-size: .85rem;
    font-weight: 600;
    text-align: center;
    padding: 12px;
    border-radius: 8px;
    color: ${type === 'success' ? '#22c55e' : '#ef4444'};
    background: ${type === 'success' ? 'rgba(34,197,94,.1)' : 'rgba(239,68,68,.1)'};
    border: 1px solid ${type === 'success' ? 'rgba(34,197,94,.25)' : 'rgba(239,68,68,.25)'};
  `;
  form.appendChild(msg);
}

/* ----------------------------------------------------------------
   ACTIVE NAV LINK on scroll (highlight nav item based on section)
   ---------------------------------------------------------------- */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav a, .mobile-nav a');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(sec => navObserver.observe(sec));
