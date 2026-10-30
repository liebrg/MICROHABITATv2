// language toggle: every element carrying both data-de/data-en gets its text swapped
const translatable = document.querySelectorAll("[data-de][data-en]");
function applyLang(lang) {
  translatable.forEach((el) => {
    const text = lang === "en" ? el.dataset.en : el.dataset.de;
    if (text !== undefined) el.textContent = text;
  });
}
const langToggle = document.querySelector(".lang-toggle");
if (langToggle) {
  langToggle.addEventListener("click", () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-lang") === "de" ? "en" : "de";
    root.setAttribute("data-lang", next);
    root.setAttribute("lang", next);
    applyLang(next);
  });
}

// mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.getElementById("siteNav");

if (siteNav) {
  const closeMenu = () => {
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
    siteNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  const toggleMenu = (button) => {
    const open = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!open));
    siteNav.classList.toggle("is-open", !open);
    document.body.classList.toggle("menu-open", !open);
  };

  if (menuToggle) {
    menuToggle.addEventListener("click", () => toggleMenu(menuToggle));
  }

  siteNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

// hero: reveal tagline/lead on cursor move or scroll
const hero = document.querySelector(".hero");
if (hero) {
  const reveal = () => hero.classList.add("is-revealed");
  hero.addEventListener("mousemove", reveal, { once: true });
  hero.addEventListener("touchstart", reveal, { once: true, passive: true });
  window.addEventListener("scroll", reveal, { once: true, passive: true });

  // hero: light/shade follows the cursor across the photo
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reducedMotion) {
    const setLight = (clientX, clientY) => {
      const rect = hero.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty("--mx", x + "%");
      hero.style.setProperty("--my", y + "%");
    };
    hero.addEventListener("mousemove", (e) => setLight(e.clientX, e.clientY));
    hero.addEventListener(
      "touchmove",
      (e) => {
        const t = e.touches[0];
        if (t) setLight(t.clientX, t.clientY);
      },
      { passive: true }
    );
  }
}
