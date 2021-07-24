const express = require("express");
const router = express.Router();

// Midlleware's

const authenticate = require("../module/authenticate");

// Routers moduls
const accoutnCreate = require("./account/create");
const accoutnSignIn = require("./account/signin");
const accoutnSignOut = require("./account/signout");

router.get("/", async (req, res) => {
  try {
    res.status(200).json({ userAgent: req.headers["user-agent"] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errMsg: "Internal Server Error" });
  }
});

router.use(accoutnCreate);
router.use(accoutnSignIn);
router.use(accoutnSignOut);

authenticate(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGZhYjlhNWE5MTcyYzI3OTQxY2FlM2IiLCJpYXQiOjE2MjcwNTYzMTB9.26BAYvDxIgm3h0MpwyKKl5Xrbo38_TImM1fPUyy649k"
);

module.exports = router;
