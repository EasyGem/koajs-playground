const mongoose = require("../libs/db");
const crypto = require("crypto");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024
  },
  salt: {
    type: String
  },
  email: String
});

userSchema
  .virtual("password")
  .set(function(password) {
    this._plainPassword = password;
    if (password) {
      this.salt = crypto.randomBytes(128).toString("base64");
      this.passwordHash = crypto.pbkdf2Sync(
        password,
        this.salt,
        1,
        128,
        "sha1"
      );
    } else {
      this.salt = undefined;
      this.passwordHash = undefined;
    }
  })
  .get(function() {
    return this._plainPassword;
  });

userSchema.methods.checkPassword = function(password) {
  if (!password) return false;
  if (!this.passwordHash) return false;
  return (
    crypto.pbkdf2Sync(password, this.salt, 1, 128, "sha1") == this.passwordHash
  );
};

exports.User = mongoose.model("User", userSchema);
