(function () {
  const STORAGE_KEY = "note-site-theme";

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = document.querySelector(".theme-toggle");
    if (btn) {
      btn.textContent = theme === "dark" ? "☀️" : "🌙";
      btn.setAttribute("aria-label", theme === "dark" ? "切换浅色模式" : "切换暗色模式");
    }
  }

  function initTheme() {
    const theme = getPreferredTheme();
    applyTheme(theme);

    const btn = document.querySelector(".theme-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
      });
    }
  }

  function initSearch() {
    const input = document.getElementById("note-search");
    if (!input) return;

    input.addEventListener("input", function () {
      const q = input.value.trim().toLowerCase();
      const items = document.querySelectorAll("[data-search]");

      items.forEach(function (el) {
        const text = (el.getAttribute("data-search") || el.textContent).toLowerCase();
        const match = !q || text.includes(q);
        el.classList.toggle("hidden", !match);
      });

      document.querySelectorAll(".category-card").forEach(function (card) {
        const visible = card.querySelectorAll(".note-item:not(.hidden)");
        const hasQuery = q.length > 0;
        card.classList.toggle("hidden", hasQuery && visible.length === 0);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initSearch();
  });
})();
