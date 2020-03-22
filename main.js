const Koa = require("koa");
const router = require("koa-router")();
const bodyparser = require("koa-bodyparser");
const render = require("./libs/render");
const serve = require("koa-static");
const app = new Koa();
require("dotenv").config();

console.log(process.env.jwtPrivateKey);

const passport = require("./libs/passport");
const checkAuth = require("./routes/scripts/checkAuth");
const index = require("./routes/index");
const article = require("./routes/article");
const user = require("./routes/user");

app.use(passport.initialize());
app.use(render);
app.use(bodyparser());
app.use(serve("static"));
app.use(checkAuth);

router.get("/", index);
router.use("/article", article.routes());
router.use("/user", user.routes());

app.use(router.routes());

app.listen(3000);

module.exports = app;
