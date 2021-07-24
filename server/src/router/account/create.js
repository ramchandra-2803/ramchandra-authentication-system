const router = require("express").Router();

const user = require("../../db/models/user");
router.post("/account/create/", async (req, res) => {
  try {
    const { first, last, username, email, password } = req.body;
    if (!first || !last || !username || !email || !password)
      return res.status(204).end("ok :)");

    if (await user.findOne({ username }))
      return res
        .status(200)
        .json({ msg: `Username ${username} is already taken!` });

    if (await user.findOne({ email }))
      return res.status(200).json({ msg: `Email ${email} is already taken!` });

    const result = new user({
      username,
      email,
      password,
      name: { first, last },
    });

    const token = await result.token(req.hostname, req.headers["user-agent"]);

    await result.save();

    res.status(201).json({ msg: "Account created!", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
