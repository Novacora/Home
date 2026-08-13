(function () {
  var menuButton = document.querySelector(".menu-btn");
  var menuPanel = document.querySelector(".menu-panel");

  if (menuButton && menuPanel) {
    menuButton.addEventListener("click", function () {
      var expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!expanded));
      menuPanel.classList.toggle("open", !expanded);
    });

    document.addEventListener("click", function (event) {
      if (!menuPanel.classList.contains("open")) {
        return;
      }
      if (!menuPanel.contains(event.target) && !menuButton.contains(event.target)) {
        menuPanel.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  var revealTargets = document.querySelectorAll(".home-block, .sub-image-block");
  if ("IntersectionObserver" in window && revealTargets.length > 0) {
    var observer = new IntersectionObserver(
      function (entries, watcher) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            watcher.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("revealed");
    });
  }
})();
