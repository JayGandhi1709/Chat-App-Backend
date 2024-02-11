const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { createToken } = require("../utils/createToken");

module.exports.user_signup = async (req, res, next) => {
  try {
    // get the username, email and password from the request body
    const { username, email, password } = req.body;

    if (username == null || email == null || password == null) {
      return res.status(400).json({ msg: "Please fill all fields!" });
    }

    // check if the user already exists
    const existingUser = await User.findOne({ email });

    // Post The Data In Database
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with same email already exist!" });
    }

    const hashedPassword = await bcryptjs.hash(password, 8);

    let user = new User({ username, email, password: hashedPassword });

    user = await user.save();

    // Return that Data To User
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports.user_login = async (req, res) => {
  try {
    // Get The Data From Client
    const { email, password } = req.body;

    if (email == "" || password == "") {
      console.log("Comming Here!");
      return res.status(400).json({ msg: "Please fill all fields!" });
    }

    const user = await User.findOne({ email });

    // Post The Data In Database
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
    }

    const match = await bcryptjs.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    const token = createToken(user._id);

    // Return that Data To User
    res.json({ token, user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.json({ ...user._doc, token: req.token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
