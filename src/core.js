(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.PageMarginCore = factory();
})(globalThis, function () {
  "use strict";

  function pageKey(value) {
    const url = new URL(value);
    if (!["https:", "http:"].includes(url.protocol))
      throw Error("Only web pages are supported.");
    return url.origin + url.pathname;
  }
  function wordCount(text) {
    return text.trim() ? text.trim().split(/\s+/u).length : 0;
  }
  function normalizeNote(text) {
    if (typeof text !== "string") throw Error("Note must be text.");
    if (text.length > 50000) throw Error("Keep notes under 50,000 characters.");
    return text.replace(/\r\n/g, "\n");
  }
  function exportNote(url, note) {
    return "# Notes for " + pageKey(url) + "\n\n" + normalizeNote(note) + "\n";
  }
  return { pageKey, wordCount, normalizeNote, exportNote };
});
