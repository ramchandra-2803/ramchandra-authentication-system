const router = require("express").Router();
const authenticate = require("../../module/authenticate");

router.post("/account/singout/", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) return res.status(204).end("OK :)");

    const result = await authenticate(token);

    if (!result)
      return res.status(200).json({ msg: "Con't find your account!" });

    result.doc.tokens.pop(result.i);
    await result.doc.save();

    res.status(202).json({ msg: "Successfull Sign-Out  :)" });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
    throw new Error(err);
  }
});

module.exports = router;
