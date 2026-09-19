document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const fill = document.getElementById("preloader-bar");
  const status = document.getElementById("preloader-status");
  const body = document.body;

  if (preloader && fill && status) {
    const lines = ["Opening the studio", "Presenting the three practices", "Preparing the brief", "Welcome"];
    const duration = 7200;
    const tick = 40;
    const steps = duration / tick;
    let step = 0;
    let idx = 0;
    const timer = setInterval(() => {
      step += 1;
      const p = Math.min((step / steps) * 100, 100);
      fill.style.width = p + "%";
      const next = Math.min(Math.floor(p / 25), lines.length - 1);
      if (next !== idx) {
        idx = next;
        status.textContent = lines[idx];
      }
      if (p >= 100) {
        clearInterval(timer);
        status.textContent = "Welcome";
        setTimeout(() => {
          preloader.classList.add("hidden");
          body.classList.remove("loading");
        }, 700);
      }
    }, tick);
  } else {
    body.classList.remove("loading");
  }

  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => menu.classList.toggle("active"));
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => menu.classList.remove("active")));
  }
});
