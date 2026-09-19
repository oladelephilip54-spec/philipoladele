document.addEventListener('DOMContentLoaded', () => {
  // PRELOADER (7 seconds)
  const preloader = document.getElementById('preloader');
  const bar = document.getElementById('preloader-bar');
  const status = document.getElementById('preloader-status');
  const body = document.body;

  if (preloader && bar && status) {
    const messages = [
      'Initializing',
      'Loading systems',
      'Preparing experience',
      'Almost ready',
      'Welcome'
    ];

    const totalDuration = 7000;
    const updateInterval = 50;
    const steps = totalDuration / updateInterval;
    let currentStep = 0;
    let msgIndex = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = Math.min((currentStep / steps) * 100, 100);
      bar.style.width = progress + '%';

      const newMsgIndex = Math.min(Math.floor(progress / 20), messages.length - 1);
      if (newMsgIndex !== msgIndex) {
        msgIndex = newMsgIndex;
        status.textContent = messages[msgIndex];
      }

      if (progress >= 100) {
        clearInterval(interval);
        status.textContent = 'Welcome';
        setTimeout(() => {
          preloader.classList.add('hidden');
          body.classList.remove('loading');
        }, 600);
      }
    }, updateInterval);
  } else {
    body.classList.remove('loading');
  }

  // NAV
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const header = document.getElementById('header');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }

  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 30);
    });
  }
});
