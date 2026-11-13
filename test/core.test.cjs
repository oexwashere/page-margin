const test = require("node:test"),
  assert = require("node:assert/strict"),
  core = require("../src/core.js");
test("page identity strips sensitive query values and fragments", () => {
  assert.equal(
    core.pageKey("https://example.com/article?token=secret#part"),
    "https://example.com/article",
  );
  assert.throws(() => core.pageKey("file:///tmp/x"));
});
test("word counting handles whitespace and Unicode", () => {
  assert.equal(core.wordCount("  hello\n café  "), 2);
  assert.equal(core.wordCount(" "), 0);
});
test("notes normalize newlines and enforce storage bounds", () => {
  assert.equal(core.normalizeNote("a\r\nb"), "a\nb");
  assert.throws(() => core.normalizeNote("x".repeat(50001)));
});
test("exports include canonical page context", () =>
  assert.match(
    core.exportNote("https://example.com/a?q=1", "hello"),
    /^# Notes for https:\/\/example.com\/a\n\nhello\n$/,
  ));
