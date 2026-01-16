// script.js
(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("navMenu");

  const closeMenu = () => {
    if (!menu || !toggle) return;
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  };

  const openMenu = () => {
    if (!menu || !toggle) return;
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
  };

  if (toggle && menu) {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains("is-open");
      isOpen ? closeMenu() : openMenu();
    });

    // Close on link click
    menu.querySelectorAll("a.nav-link, .btn").forEach((el) => {
      el.addEventListener("click", () => closeMenu());
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!menu.classList.contains("is-open")) return;
      const target = e.target;
      if (target instanceof Node && !menu.contains(target) && target !== toggle) closeMenu();
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  // Reveal on scroll
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    }
  }, { threshold: 0.12 });

  revealEls.forEach((el) => io.observe(el));

  // Filters
  const chips = Array.from(document.querySelectorAll(".chip"));
  const cards = Array.from(document.querySelectorAll(".card"));

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("is-active"));
      chip.classList.add("is-active");

      const filter = chip.getAttribute("data-filter");
      cards.forEach((card) => {
        const cat = card.getAttribute("data-category");
        const show = filter === "all" || cat === filter;
        card.style.display = show ? "" : "none";
      });
    });
  });

  // Lightbox
  const lb = document.getElementById("lightbox");
  const lbImg = lb?.querySelector(".lightbox-img");
  const lbCaption = document.getElementById("lightboxCaption");
  const lbCloseEls = lb?.querySelectorAll("[data-close]") || [];

  const lbPrev = document.getElementById("lbPrev");
  const lbNext = document.getElementById("lbNext");

  const items = Array.from(document.querySelectorAll("[data-lightbox]")).map((btn) => ({
    el: btn,
    src: btn.getAttribute("data-lightbox") || "",
    caption: btn.getAttribute("data-caption") || ""
  }));

  let currentIndex = -1;

  const setLightbox = (index) => {
    if (!lb || !lbImg) return;
    if (index < 0 || index >= items.length) return;

    currentIndex = index;
    lbImg.src = items[index].src;
    lbImg.alt = items[index].caption || "Selected photo";
    if (lbCaption) lbCaption.textContent = items[index].caption;
  };

  const openLightbox = (index) => {
    if (!lb) return;
    setLightbox(index);
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    if (!lb) return;
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lbImg) lbImg.src = "";
    currentIndex = -1;
  };

  items.forEach((item, i) => {
    item.el.addEventListener("click", () => openLightbox(i));
  });

  lbCloseEls.forEach((el) => el.addEventListener("click", closeLightbox));

  const prev = () => {
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex - 1 + items.length) % items.length;
    setLightbox(nextIndex);
  };

  const next = () => {
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % items.length;
    setLightbox(nextIndex);
  };

  lbPrev?.addEventListener("click", prev);
  lbNext?.addEventListener("click", next);

  document.addEventListener("keydown", (e) => {
    if (!lb || !lb.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });
})();
