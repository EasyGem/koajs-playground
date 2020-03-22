const views = require("koa-views");
const path = require("path");
require("pug");

module.exports = views(path.join(__dirname, "../views"), {
  extension: "pug"
});
