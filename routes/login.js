module.exports = async ctx => {
  if (ctx.state.user) ctx.redirect("/");

  await ctx.render("login");
};
