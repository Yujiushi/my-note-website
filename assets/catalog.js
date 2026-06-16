(function () {
  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(text) {
    return escapeHtml(text).replace(/'/g, "&#39;");
  }

  function renderCategories(data) {
    const grid = document.getElementById("category-grid");
    if (!grid || !data.categories) return;

    grid.innerHTML = "";

    NoteManifest.CATEGORY_ORDER.forEach(function (key) {
      const cat = data.categories[key];
      if (!cat) return;

      const count = NoteManifest.countItems(cat.children);
      const card = document.createElement("a");
      card.href = NoteManifest.browseHref(key, "");
      card.className = "category-folder-card";
      card.setAttribute("data-search", (cat.search || "") + " " + cat.label);

      card.innerHTML =
        '<span class="category-folder-icon">📁</span>' +
        "<h2>" +
        cat.emoji +
        " " +
        escapeHtml(cat.label) +
        "</h2>" +
        '<p class="cat-desc">' +
        escapeHtml(cat.desc || "") +
        "</p>" +
        '<span class="category-item-count">' +
        count +
        " 项</span>";

      grid.appendChild(card);
    });
  }

  function renderSearchResults(items, query) {
    const box = document.getElementById("search-results");
    if (!box) return;

    if (!query) {
      box.hidden = true;
      box.innerHTML = "";
      document.getElementById("category-grid").hidden = false;
      return;
    }

    const matched = items.filter(function (item) {
      return item.search.toLowerCase().includes(query);
    });

    document.getElementById("category-grid").hidden = true;
    box.hidden = false;

    if (!matched.length) {
      box.innerHTML = '<p class="search-empty">没有匹配的笔记</p>';
      return;
    }

    box.innerHTML =
      '<ul class="search-results-list">' +
      matched
        .map(function (item) {
          const icon = item.kind === "folder" ? "📁" : "📄";
          const meta =
            item.kind === "page"
              ? item.categoryLabel + " · " + (item.date || "")
              : item.categoryLabel + " · 文件夹";
          return (
            '<li><a href="' +
            escapeHtml(item.href) +
            '"><span>' +
            icon +
            " " +
            escapeHtml(item.title) +
            '</span><span class="search-result-meta">' +
            escapeHtml(meta) +
            "</span></a></li>"
          );
        })
        .join("") +
      "</ul>";
  }

  async function initCatalog() {
    const grid = document.getElementById("category-grid");
    if (!grid) return;

    try {
      const data = await NoteManifest.load();
      const allItems = NoteManifest.flatten(data);
      renderCategories(data);

      const input = document.getElementById("note-search");
      if (input) {
        input.addEventListener("input", function () {
          const q = input.value.trim().toLowerCase();
          renderSearchResults(allItems, q);

          if (!q) {
            NoteManifest.CATEGORY_ORDER.forEach(function () {});
            grid.querySelectorAll(".category-folder-card").forEach(function (card) {
              card.classList.remove("hidden");
            });
            return;
          }

          NoteManifest.CATEGORY_ORDER.forEach(function (key, i) {
            const card = grid.children[i];
            if (!card) return;
            const catMatch = (data.categories[key].search || "")
              .toLowerCase()
              .includes(q);
            const itemMatch = allItems.some(function (item) {
              return item.category === key && item.search.toLowerCase().includes(q);
            });
            card.classList.toggle("hidden", !catMatch && !itemMatch);
          });
        });
      }
    } catch (err) {
      grid.innerHTML =
        '<p class="catalog-error">目录加载失败，请刷新页面重试。</p>';
      console.error(err);
    }
  }

  document.addEventListener("DOMContentLoaded", initCatalog);
})();
