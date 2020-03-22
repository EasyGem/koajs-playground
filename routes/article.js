const { Article } = require("../models/article");
const router = require("koa-router")();

router.get("/write", async ctx => {
  if (!ctx.state.user) return ctx.redirect("/user/signin");
  ctx.body = "Article writing is currently not available";
});

router.get("/:id", async ctx => {
  let _id = ctx.params.id;
  if (!_id.match(/^[0-9a-fA-F]{24}$/)) ctx.throw(400);

  const article = await Article.findOne({ _id });

  await ctx.render("article", {
    article,
    user: ctx.state.user
  });
});

module.exports = router;
