/* ============================================
   PHILIP OLADELE — Scripts
   Preloader (60 seconds) + Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ========== PRELOADER (exactly 60 seconds) ==========
  const preloader = document.getElementById('preloader');
  const bar = document.getElementById('preloader-bar');
  const status = document.getElementById('preloader-status');
  const body = document.body;

  const messages = [
    'INITIALIZING SYSTEM...',
    'LOADING STRATEGY MODULES...',
    'CALIBRATING GROWTH ENGINE...',
    'SYNCING CLIENT RESULTS...',
    'OPTIMIZING CONTENT PIPELINES...',
    'PREPARING YOUR EXPERIENCE...',
    'ALMOST READY...'
  ];

  const totalDuration = 60000; // 60 seconds
  const updateInterval = 200; // update every 200ms
  const steps = totalDuration / updateInterval;
  let currentStep = 0;
  let msgIndex = 0;

  const interval = setInterval(() => {
    currentStep++;
    const progress = Math.min((currentStep / steps) * 100, 100);
    bar.style.width = progress + '%';

    // Change message roughly every ~8.5 seconds
    const newMsgIndex = Math.min(Math.floor(progress / 14.3), messages.length - 1);
    if (newMsgIndex !== msgIndex) {
      msgIndex = newMsgIndex;
      status.textContent = messages[msgIndex];
    }

    if (progress >= 100) {
      clearInterval(interval);
      status.textContent = 'SYSTEM READY';
      setTimeout(() => {
        preloader.classList.add('hidden');
        body.classList.remove('loading');
        animateCounters();
      }, 800);
    }
  }, updateInterval);

  // ========== NAV ==========
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const header = document.getElementById('header');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ========== PARTICLES ==========
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    const count = window.innerWidth < 768 ? 20 : 40;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 2.5 + 1;
      p.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(0, 240, 255, ${Math.random() * 0.45 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: floatParticle ${Math.random() * 18 + 12}s linear infinite;
        pointer-events: none;
      `;
      particlesContainer.appendChild(p);
    }
    const style = document.createElement('style');
    style.textContent = `
      @keyframes floatParticle {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        8% { opacity: 1; }
        92% { opacity: 1; }
        100% { transform: translateY(-100vh) translateX(${Math.random() * 80 - 40}px); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // ========== COUNTER ANIMATION ==========
  function animateCounters() {
    document.querySelectorAll('.stat-number[data-count]').forEach(el => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      const duration = 1800;
      const start = performance.now();
      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(ease * target);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
      }
      requestAnimationFrame(update);
    });
  }

  // ========== SCROLL REVEAL ==========
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.glass, .service-card, .result-card, .testimonial, .team-card, .process-step, .system-card, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';
    el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
    observer.observe(el);
  });
});
