const passport = require("../../libs/passport");

module.exports = async (ctx, next) => {
  await passport.authenticate("jwt", async (err, user) => {
    ctx.state.user = user;

    await next();
  })(ctx, next);
};
