document.addEventListener("DOMContentLoaded", function () {
  /* =========================================================
     EXISTING SITE SCRIPT — kept intact
  ========================================================= */

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

      if (bar) {
        bar.style.width = (ease * 100) + "%";
      }

      if (status) {
        var idx = Math.min(
          Math.floor(t * lines.length),
          lines.length - 1
        );

        status.textContent = lines[idx];
      }

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        if (status) {
          status.textContent =
            "Author & Book Marketing Strategist";
        }

        setTimeout(function () {
          preloader.classList.add("hidden");
          body.classList.remove("loading");
        }, 400);
      }
    }

    requestAnimationFrame(frame);
  }


  /* =========================================================
     MOBILE NAVIGATION
  ========================================================= */

  var toggle = document.getElementById("nav-toggle");
  var menu = document.getElementById("nav-menu");

  if (toggle && menu) {

    toggle.addEventListener("click", function () {
      menu.classList.toggle("active");
      menu.classList.toggle("open");
    });

    var menuLinks = menu.querySelectorAll("a");

    Array.prototype.forEach.call(menuLinks, function (link) {

      link.addEventListener("click", function () {
        menu.classList.remove("active");
        menu.classList.remove("open");
      });

    });
  }


  /* =========================================================
     HEADER SCROLL STATE
  ========================================================= */

  var header = document.getElementById("site-header");

  if (header) {

    function updateHeader() {

      if (window.scrollY > 24) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }

    }

    window.addEventListener(
      "scroll",
      updateHeader,
      { passive: true }
    );

    updateHeader();
  }


  /* =========================================================
     REVEAL ANIMATIONS
  ========================================================= */

  if ("IntersectionObserver" in window) {

    var io = new IntersectionObserver(
      function (entries) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            io.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    document
      .querySelectorAll(".reveal")
      .forEach(function (el) {

        io.observe(el);

      });

  } else {

    document
      .querySelectorAll(".reveal")
      .forEach(function (el) {

        el.classList.add("visible");

      });

  }


  /* =========================================================
     COUNTERS
  ========================================================= */

  function formatCount(number, decimals) {

    if (decimals) {
      return number.toFixed(decimals);
    }

    return String(Math.round(number));
  }


  function countUp(el) {

    if (el.getAttribute("data-done") === "1") {
      return;
    }

    el.setAttribute("data-done", "1");

    var target = parseFloat(
      el.getAttribute("data-target") || "0"
    );

    var suffix =
      el.getAttribute("data-suffix") || "";

    var decimals = parseInt(
      el.getAttribute("data-decimals") || "0",
      10
    );

    var duration = 15000;
    var start = performance.now();


    function tick(now) {

      var t0 = Math.min(
        (now - start) / duration,
        1
      );

      var eased =
        1 - Math.pow(1 - t0, 3);


      el.textContent =
        formatCount(
          target * eased,
          decimals
        ) + suffix;


      if (t0 < 1) {
        requestAnimationFrame(tick);
      }

    }

    requestAnimationFrame(tick);
  }


  var counters =
    document.querySelectorAll(".count");


  if (
    counters.length &&
    "IntersectionObserver" in window
  ) {

    var cio =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              countUp(entry.target);

              cio.unobserve(entry.target);
            }

          });

        },
        {
          threshold: 0.4
        }
      );


    counters.forEach(function (el) {

      cio.observe(el);

    });

  }


  /* =========================================================
     PHILIP OLADELE — FIRE NAVIGATION
     
     Works with the EXISTING navigation HTML.
     
     It does NOT require additional HTML elements.
  ========================================================= */

  var fireNav =
    document.getElementById("nav-menu");


  if (!fireNav) {
    return;
  }


  var fireItems =
    fireNav.querySelectorAll(
      "a.nav-link.fire, a.po-fire-nav__item"
    );


  if (!fireItems.length) {
    return;
  }


  /* =========================================================
     REDUCED MOTION
  ========================================================= */

  var reduceMotion = false;


  try {

    reduceMotion =
      window.matchMedia &&
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

  } catch (e) {

    reduceMotion = false;

  }


  /* =========================================================
     GET FIRE COLOR
  ========================================================= */

  function getColor(item) {

    return (
      item.getAttribute("data-fire-color") ||
      "#ff6a00"
    );

  }


  /* =========================================================
     POSITION FIRE EFFECT
  ========================================================= */

  function positionFire(
    item,
    createSparks
  ) {

    if (!item || !fireNav) {
      return;
    }


    var color = getColor(item);


    var navRect =
      fireNav.getBoundingClientRect();


    var itemRect =
      item.getBoundingClientRect();


    if (
      !navRect.width ||
      !itemRect.width
    ) {
      return;
    }


    var x =
      itemRect.left -
      navRect.left;


    var y =
      itemRect.top -
      navRect.top;


    fireNav.style.setProperty(
      "--po-fire",
      color
    );


    fireNav.style.setProperty(
      "--po-x",
      x + "px"
    );


    fireNav.style.setProperty(
      "--po-w",
      itemRect.width + "px"
    );


    fireNav.style.setProperty(
      "--po-mobile-y",
      y + "px"
    );


    item.style.setProperty(
      "--item-fire",
      color
    );


    if (
      createSparks &&
      !reduceMotion
    ) {

      createSparksAt(
        item,
        color
      );

    }

  }


  /* =========================================================
     CREATE SPARK PARTICLES
  ========================================================= */

  function createSparksAt(
    item,
    color
  ) {

    var rect =
      item.getBoundingClientRect();


    if (
      !rect.width ||
      !rect.height
    ) {
      return;
    }


    var originX =
      rect.left +
      rect.width / 2;


    var originY =
      rect.top +
      rect.height / 2;


    for (var i = 0; i < 5; i++) {

      var spark =
        document.createElement("span");


      spark.className =
        "po-fire-spark";


      spark.style.position =
        "fixed";


      spark.style.left =
        (
          originX +
          (Math.random() * 14 - 7)
        ) + "px";


      spark.style.top =
        (
          originY +
          (Math.random() * 8 - 4)
        ) + "px";


      spark.style.setProperty(
        "--po-spark",
        color
      );


      spark.style.setProperty(
        "--po-dx",
        (
          Math.random() * 60 - 30
        ) + "px"
      );


      spark.style.setProperty(
        "--po-dy",
        (
          -20 -
          Math.random() * 45
        ) + "px"
      );


      spark.style.setProperty(
        "--po-spark-time",
        (
          0.55 +
          Math.random() * 0.45
        ) + "s"
      );


      document.body.appendChild(
        spark
      );


      (function (node) {

        setTimeout(
          function () {

            if (
              node &&
              node.parentNode
            ) {

              node.parentNode.removeChild(
                node
              );

            }

          },
          1100
        );

      })(spark);

    }

  }


  /* =========================================================
     ACTIVATE NAV ITEM
  ========================================================= */

  function activate(
    item,
    sparks
  ) {

    if (!item) {
      return;
    }


    Array.prototype.forEach.call(
      fireItems,
      function (other) {

        other.classList.remove(
          "fire-active"
        );

      }
    );


    item.classList.add(
      "fire-active"
    );


    positionFire(
      item,
      sparks
    );

  }


  /* =========================================================
     HOVER + FOCUS + CLICK
  ========================================================= */

  Array.prototype.forEach.call(
    fireItems,
    function (item) {


      item.addEventListener(
        "mouseenter",
        function () {

          positionFire(
            item,
            true
          );

        }
      );


      item.addEventListener(
        "focus",
        function () {

          positionFire(
            item,
            true
          );

        }
      );


      item.addEventListener(
        "click",
        function () {

          activate(
            item,
            false
          );

        }
      );

    }
  );


  /* =========================================================
     MOUSE LEAVES NAV
  ========================================================= */

  fireNav.addEventListener(
    "mouseleave",
    function () {

      var active =
        fireNav.querySelector(
          "a.fire-active"
        ) ||
        fireNav.querySelector(
          "a.nav-link.active"
        ) ||
        fireItems[0];


      positionFire(
        active,
        false
      );

    }
  );


  /* =========================================================
     RESPONSIVE RESIZE
  ========================================================= */

  window.addEventListener(
    "resize",
    function () {

      var active =
        fireNav.querySelector(
          "a.fire-active"
        ) ||
        fireNav.querySelector(
          "a.nav-link.active"
        ) ||
        fireItems[0];


      positionFire(
        active,
        false
      );

    },
    {
      passive: true
    }
  );


  /* =========================================================
     INITIAL FIRE POSITION
  ========================================================= */

  var initial =
    fireNav.querySelector(
      "a.nav-link.active"
    ) ||
    fireNav.querySelector(
      "a.fire-active"
    ) ||
    fireItems[0];


  activate(
    initial,
    false
  );

});
