const router = require("express").Router();
const bcrypt = require("bcryptjs");
const user = require("../../db/models/user");

router.post("/account/signin/", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) return res.status(204).end("OK :)");

    const result = await user.findOne({ username });

    if (!result) return res.status(200).json({ msg: "Invalid Credentials" });

    if (!(await bcrypt.compare(password, result.password)))
      res.status(200).json({ msg: "Invalid Credentials" });

    const token = await result.token(req.hostname, req.headers["user-agent"]);
    await result.save();
    res.status(202).json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
    throw new Error(err);
  }
});

module.exports = router;
