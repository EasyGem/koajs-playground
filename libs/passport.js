const { User } = require("../models/user");
const passport = require("koa-passport");
const LocalStrategy = require("passport-local");
const JwtStrategy = require("passport-jwt").Strategy;

const jwtsecret = "mysecretkey"; // ключ для подписи JWT

const cookieExtractor = function(ctx) {
  var token = null;
  if (ctx && ctx.cookies) {
    token = ctx.cookies.get("auth_token");
  }
  return token;
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false
    },
    function(username, password, done) {
      User.findOne({ username }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user || !user.checkPassword(password)) {
          return done(null, false, {
            message: "Нет такого пользователя или пароль неверен."
          });
        }
        return done(null, user);
      });
    }
  )
);

const jwtOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: jwtsecret
};

passport.use(
  new JwtStrategy(jwtOptions, function(payload, done) {
    User.findById(payload.id, (err, user) => {
      if (err) {
        return done(err);
      }

      if (user && user.passwordHash == payload.passwordHash) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  })
);

module.exports = passport;
