const jwt = require("jsonwebtoken");
const user = require("../db/models/user");

const authenticate = async (token) => {
  try {
    const _id = await jwt.verify(token, process.env.JWT_SECRET)._id;

    const result = await user.findById(_id);

    if (!result) return false;

    for (let i = 0; i < result.tokens.length; i++)
      if (token === result.tokens[i].token) return { _id, doc: result, i };

    return false;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = authenticate;
