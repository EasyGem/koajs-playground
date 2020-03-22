const { Article } = require("../models/article");

module.exports = async ctx => {
  const articles = await Article.find()
    .select({ content: 0 })
    .limit(15);

  await ctx.render("index", {
    articles,
    user: ctx.state.user
  });
};
