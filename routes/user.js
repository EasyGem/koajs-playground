const router = require("koa-router")();
const passport = require("../libs/passport");
const { User } = require("../models/user");
const jwtsecret = "mysecretkey"; // ключ для подписи JWT
const jwt = require("jsonwebtoken"); // аутентификация по JWT для hhtp

router.get("/signup", async ctx => {
  if (ctx.state.user) return ctx.redirect("/");

  await ctx.render("signup");
});

router.get("/signin", async ctx => {
  if (ctx.state.user) return ctx.redirect("/");

  await ctx.render("signin");
});

router.get("/signout", async ctx => {
  ctx.cookies.set("auth_token", null);
  ctx.redirect("/");
});

router.post("/signup", async ctx => {
  if (ctx.state.user) return ctx.redirect("/");

  try {
    ctx.body = await User.create(ctx.request.body);
  } catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

router.post("/signin", async ctx => {
  if (ctx.state.user) return ctx.redirect("/");

  await passport.authenticate("local", function(err, user, info) {
    if (user == false) {
      ctx.body = info.message;
    } else {
      //--payload - информация которую мы храним в токене и можем из него получать
      const payload = {
        id: user.id,
        passwordHash: user.passwordHash,
        email: user.email
      };
      const token = jwt.sign(payload, jwtsecret, { expiresIn: "1h" }); //здесь создается JWT
      ctx.cookies.set("auth_token", token);
      ctx.redirect("/");
    }
  })(ctx);
});

module.exports = router;
