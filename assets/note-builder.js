(function () {
  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function buildNoteHtml(opts) {
    const root = NoteManifest.rootPrefix(opts.folderPath || "");
    const browseUrl =
      root +
      NoteManifest.browseHref(opts.categoryId, opts.folderPath || "").replace(
        /^browse\.html/,
        "browse.html"
      );
    const indexUrl = root + "index.html";
    const tagHtml = opts.tag
      ? '        <span class="tag">' + escapeHtml(opts.tag) + "</span>\n"
      : "";

    const breadcrumb = NoteManifest.getBreadcrumb(
      opts.manifest,
      opts.categoryId,
      opts.folderPath || ""
    );
    const breadcrumbHtml = breadcrumb
      .concat([{ label: opts.title, href: null }])
      .map(function (crumb, i, arr) {
        if (!crumb.href || i === arr.length - 1) {
          return "<span>" + escapeHtml(crumb.label) + "</span>";
        }
        return (
          '<a href="' +
          root +
          crumb.href.replace(/^\//, "") +
          '">' +
          escapeHtml(crumb.label) +
          "</a>"
        );
      })
      .join('<span class="breadcrumb-sep">/</span>');

    return (
      '<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>' +
      escapeHtml(opts.title) +
      " · " +
      escapeHtml(opts.categoryLabel) +
      '</title>\n  <link rel="stylesheet" href="' +
      root +
      'assets/style.css">\n  <script src="' +
      root +
      'assets/site.js" defer><\/script>\n</head>\n<body>\n  <header class="site-header">\n    <div class="header-inner">\n      <a class="site-title" href="' +
      indexUrl +
      '">📚 我的笔记</a>\n      <div class="header-actions">\n        <button class="theme-toggle" type="button" aria-label="切换暗色模式">🌙</button>\n      </div>\n    </div>\n  </header>\n\n  <main class="page-narrow">\n    <nav class="breadcrumb breadcrumb--note" aria-label="路径">' +
      breadcrumbHtml +
      '</nav>\n    <header class="note-header">\n      <h1>' +
      escapeHtml(opts.title) +
      '</h1>\n      <div class="note-meta">\n        <span>📁 ' +
      escapeHtml(opts.categoryLabel) +
      "</span>\n        <span>📅 " +
      escapeHtml(opts.date) +
      '</span>\n' +
      tagHtml +
      '      </div>\n    </header>\n\n    <article class="note-content">\n' +
      opts.bodyHtml +
      '\n    </article>\n\n    <nav class="note-nav">\n      <a href="' +
      root +
      NoteManifest.browseHref(opts.categoryId, opts.folderPath || "") +
      '">← 返回文件夹</a>\n      <span></span>\n    </nav>\n  </main>\n\n  <footer class="site-footer">\n    <p>托管于 GitHub Pages · 纯静态站点</p>\n  </footer>\n</body>\n</html>\n'
    );
  }

  window.buildNoteHtml = buildNoteHtml;
})();
