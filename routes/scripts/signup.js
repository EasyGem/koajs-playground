const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const _ = require("lodash");

module.exports = async ctx => {
  if (ctx.state.user) ctx.redirect("/");

  let body = _.pick(ctx.request.body, [
    "username",
    "password",
    "confirmPassword"
  ]);
  console.log(body);

  ctx.assert(body.username, 400);
  ctx.assert(body.password == body.confirmPassword, 400);

  const similarUser = await User.findOne({
    username: ctx.request.body.username
  });
  ctx.assert(!similarUser, 400, "Username is already taken");

  body.password = await bcrypt.hash(body.password, 10);

  try {
    await User.create(body);
  } catch (e) {
    return ctx.throw(400, e.message);
  }

  // process
};
