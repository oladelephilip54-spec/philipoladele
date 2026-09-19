document.addEventListener("DOMContentLoaded", function () {
  var preloader = document.getElementById("preloader");
  var bar = document.getElementById("preloader-bar");
  var status = document.getElementById("preloader-status");
  var pctEl = document.getElementById("loader-pct");
  var circle = document.getElementById("loader-circle");
  var body = document.body;
  var circumference = 2 * Math.PI * 40;

  if (preloader && bar && status) {
    var lines = [
      "Preparing the studio",
      "Loading systems",
      "Social · Web · Books",
      "Almost ready"
    ];
    var duration = 3200;
    var start = performance.now();

    function frame(now) {
      var t = Math.min((now - start) / duration, 1);
      var ease = 1 - Math.pow(1 - t, 3);
      var p = Math.round(ease * 100);
      bar.style.width = p + "%";
      if (pctEl) pctEl.textContent = String(p);
      if (circle) {
        circle.style.strokeDashoffset = String(circumference * (1 - ease));
      }
      var idx = Math.min(Math.floor(t * lines.length), lines.length - 1);
      status.textContent = lines[idx];
      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        status.textContent = "Welcome";
        setTimeout(function () {
          preloader.classList.add("hidden");
          body.classList.remove("loading");
        }, 400);
      }
    }
    requestAnimationFrame(frame);
  } else if (preloader) {
    setTimeout(function () {
      preloader.classList.add("hidden");
      body.classList.remove("loading");
    }, 800);
  }

  var toggle = document.getElementById("nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      menu.classList.toggle("active");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("active");
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
});
