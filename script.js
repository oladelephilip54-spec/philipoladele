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
