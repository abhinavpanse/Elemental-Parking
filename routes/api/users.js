const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route POST api/users
// @desc  Make a teacher
// @access Public
router.post(
  "/",
  [
    check("carnumber", "carnumber is required")
      .not()
      .isEmpty(),
    check("name", "Name is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, carnumber, teacherid } = req.body;

    try {
      let user = await User.findOne({ carnumber });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        name,
        carnumber,
        teacherid
      });

      await user.save();

      return res.send("User registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
