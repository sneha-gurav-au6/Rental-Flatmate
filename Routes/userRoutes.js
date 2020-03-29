const express = require("express");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../model/user");

router.post("/user/register", (req, res) => {
  const user = new User({ ...req.body });
  jwt.sign({ user: user }, "secret key", async (err, token) => {
    user.token = token;
    await user.save();
    try {
      if (user) {
        res.json(user);
      }
    } catch (err) {
      console.log(err);
    }
  });
});

router.post("/user/login", async (req, res) => {
  var body = req.body;
  var email = body.email;
  var password = body.password;
  if (!email || !password) return res.send("Invalid Creadiantials");
  try {
    const user = await User.userFind(email, password);
    if (user) {
      jwt.sign(
        { id: user._id },
        "secret key",
        { expiresIn: 60 * 60 * 1 },
        (err, token) => {
          User.updateOne({ email: email }, { $set: { token: token } }).then(
            function(us) {
              User.find({ email: email }).then(function(user) {
                res.json(user);
              });
            }
          );
        }
      );
    }
  } catch (err) {
    console.log(err);
    res.send("invalid Credintials");
  }
});

module.exports = router;
