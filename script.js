document.addEventListener("DOMContentLoaded", function () {
  var preloader = document.getElementById("preloader");
  var bar = document.getElementById("preloader-bar");
  var status = document.getElementById("preloader-status");
  var body = document.body;

  if (preloader) {
    var lines = [
      "Digital Growth Strategist",
      "Web & UI/UX Designer",
      "Author & Book Marketing Strategist"
    ];
    var duration = 3200;
    var start = performance.now();

    function frame(now) {
      var t = Math.min((now - start) / duration, 1);
      var ease = 1 - Math.pow(1 - t, 3);
      if (bar) bar.style.width = (ease * 100) + "%";
      if (status) {
        var idx = Math.min(Math.floor(t * lines.length), lines.length - 1);
        status.textContent = lines[idx];
      }
      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        if (status) status.textContent = "Author & Book Marketing Strategist";
        setTimeout(function () {
          preloader.classList.add("hidden");
          body.classList.remove("loading");
        }, 400);
      }
    }
    requestAnimationFrame(frame);
  }

  var toggle = document.getElementById("nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      menu.classList.toggle("active");
      menu.classList.toggle("open");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("active");
        menu.classList.remove("open");
      });
    });
  }

  var header = document.getElementById("site-header");
  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 24) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    }, { passive: true });
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("visible");
    });
  }

  function formatCount(n, decimals) {
    if (decimals) return n.toFixed(decimals);
    return String(Math.round(n));
  }

  function countUp(el) {
    if (el.getAttribute("data-done") === "1") return;
    el.setAttribute("data-done", "1");
    var target = parseFloat(el.getAttribute("data-target") || "0");
    var suffix = el.getAttribute("data-suffix") || "";
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var duration = 15000;
    var start = performance.now();
    function tick(now) {
      var t0 = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - t0, 3);
      el.textContent = formatCount(target * eased, decimals) + suffix;
      if (t0 < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var counters = document.querySelectorAll(".count");
  if (counters.length && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          countUp(e.target);
          cio.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  }
});
// ===== FIRE + WIND + EMBERS + REACTIVE HEAT SHIMMER =====
(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'fire-embers';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];
  let activeLink = null;
  let mouseX = window.innerWidth / 2;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Track mouse
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
  });

  class Ember {
    constructor(x, y, intense = false) {
      this.x = x + (Math.random() - 0.5) * 34;
      this.y = y;
      this.vx = (Math.random() - 0.5) * (intense ? 2.1 : 1.3);
      this.vy = -Math.random() * (intense ? 3.5 : 2.4) - 1;
      this.life = 1;
      this.decay = Math.random() * 0.015 + 0.011;
      this.size = Math.random() * (intense ? 3.5 : 2.4) + 1.1;
      this.color = intense
        ? `hsl(${18 + Math.random() * 28}, 100%, ${55 + Math.random() * 25}%)`
        : `hsl(${12 + Math.random() * 30}, 100%, ${50 + Math.random() * 20}%)`;
      this.wind = (Math.random() - 0.5) * 0.2;
    }

    update() {
      this.vy += 0.028;
      this.vx += this.wind;
      this.x += this.vx;
      this.y += this.vy;
      this.life -= this.decay;
      this.size *= 0.982;
    }

    draw() {
      ctx.globalAlpha = Math.max(this.life, 0);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.life * 0.3;
      ctx.fill();
    }
  }

  function spawnEmbers(link, intense = false) {
    if (!link) return;
    const rect = link.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.bottom - 3;

    const count = intense ? 8 : 4;
    for (let i = 0; i < count; i++) {
      particles.push(new Ember(x, y, intense));
    }
  }

  function updateHeatShimmer(link) {
    document.querySelectorAll('.heat-shimmer').forEach(el => el.remove());
    if (!link) return;

    const shimmer = document.createElement('span');
    shimmer.className = 'heat-shimmer';
    link.appendChild(shimmer);
  }

  // React heat shimmer to mouse
  function updateShimmerParallax() {
    if (!activeLink) return;
    const shimmer = activeLink.querySelector('.heat-shimmer');
    if (!shimmer) return;

    const rect = activeLink.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const delta = (mouseX - centerX) / 18; // sensitivity
    const limited = Math.max(-14, Math.min(14, delta));

    shimmer.style.transform = `translateX(calc(-50% + ${limited}px))`;
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    if (activeLink && Math.random() > 0.5) {
      spawnEmbers(activeLink, true);
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw();
      if (p.life <= 0 || p.size < 0.3) {
        particles.splice(i, 1);
      }
    }

    updateShimmerParallax();
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  animate();

  // Link setup
  const links = document.querySelectorAll('.nav-link.fire');
  const currentPath = window.location.pathname.split('/').pop() || '/';

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (
      href === currentPath ||
      (currentPath === '' && (href === '/' || href === 'index.html')) ||
      (currentPath === 'index.html' && href === '/')
    ) {
      link.classList.add('active');
      activeLink = link;
      updateHeatShimmer(link);
    }

    link.addEventListener('mouseenter', () => {
      for (let i = 0; i < 6; i++) spawnEmbers(link, false);
    });

    link.addEventListener('click', function () {
      links.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      activeLink = this;
      updateHeatShimmer(this);

      for (let i = 0; i < 24; i++) {
        setTimeout(() => spawnEmbers(this, true), i * 15);
      }
    });
  });
})();
// ===== GSAP + TILT =====
(function () {
  if (!window.gsap) return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".hero h1, .hero .kicker, .hero p, .actions, .stats", {
    y: 28,
    opacity: 0,
    duration: 0.9,
    stagger: 0.08,
    ease: "power3.out",
    delay: 0.15
  });

  gsap.from(".metric", {
    scrollTrigger: {
      trigger: ".metrics",
      start: "top 85%"
    },
    y: 40,
    opacity: 0,
    rotateX: 18,
    duration: 0.8,
    stagger: 0.08,
    ease: "power3.out"
  });

  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll(".metric"), {
      max: 10,
      speed: 600,
      glare: true,
      "max-glare": 0.18,
      scale: 1.03
    });
  }
})();
// ===== FIX METRICS VISIBILITY =====
(function () {
  var cards = document.querySelectorAll(".metric");
  cards.forEach(function (card) {
    card.classList.add("visible");
    card.style.opacity = "1";
    card.style.transform = "none";
  });

  if (!window.gsap) return;

  if (window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  gsap.fromTo(
    ".metric",
    { y: 28, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".metrics",
        start: "top 90%",
        once: true
      }
    }
  );
})();
