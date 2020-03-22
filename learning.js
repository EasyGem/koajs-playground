const Koa = require("koa");
const app = new Koa();
const router = require("koa-router")();
const views = require("koa-views");
require("pug");

router.get(
  "/say",
  async (ctx, next) => {
    ctx.body = "Hello Sasha";
    next();
  },
  ctx => {
    ctx.body = 13;
  }
);

app.use(
  views(__dirname + "/views", {
    extension: "pug"
  })
);

router.get("/render", async ctx => {
  await ctx.render("user", {
    user: "John"
  });
});

app.use(router.routes());

app.keys = ["im a newer secret2", "i like turtlse"];

// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

// response

app.use(async ctx => {
  // ctx.throw(403, "Sorry", { user: "guse" });
  ctx.append("Link", "<http://127.0.0.1/>");

  ctx.body = "Hello World";
  ctx.cookies.set("name", "tobi", { signed: true });
  // console.log(ctx.res, ctx.response);
});

app.listen(3000);
