const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!!!/^[a-z0-9/.]{8,16}$/.exec(value))
        return console.error(`Username format is invalid!`);
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!!!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.exec(value))
        return console.error("Email address is invalid!");
    },
  },
  password: {
    type: String,
    requried: true,
    validate(value) {
      if (!!!/.{8,}/.exec(value)) return console.error("Not a strong password");
    },
  },
  name: {
    first: {
      type: String,
      required: true,
      validate(value) {
        if (!!!/^[A-Za-z]{3,}$/.exec(value))
          return console.error("First name only letters");
      },
    },
    last: {
      type: String,
      required: true,
      validate(value) {
        if (!!!/^[A-Za-z]{3,}$/.exec(value))
          return console.error("Last name only letters");
      },
    },
  },

  tokens: [
    {
      token: { type: String, required: true },
      create: { type: String, default: new Date().toLocaleString() },
      expire: {
        type: String,
        default: new Date(Date.now() + 604800000).toLocaleString(),
      },
      ip: { type: String, required: true },
      userAgent: { type: String, required: true },
    },
  ],
});

Schema.methods.token = async function (ip, userAgent) {
  try {
    const token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET);

    this.tokens = this.tokens.concat({ token, ip, userAgent });
    return token;
  } catch (err) {
    return console.error(`Con't create the token: ${err}`);
  }
};

Schema.pre("save", async function () {
  try {
    if (this.isModified("password"))
      this.password = await bcrypt.hash(
        this.password,
        await bcrypt.genSalt(10)
      );
  } catch (err) {
    return console.error(`Con't create the password hash: ${err}`);
  }
});

const model = new mongoose.model("user", Schema);

module.exports = model;
