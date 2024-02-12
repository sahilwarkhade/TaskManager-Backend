const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(403).json({
        error: "Please,fill all field",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ user, message: "User Created Successfully" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      throw new Error("Please Enter all fields");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Unable to login , invalid credentials");
    }
    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Unable to login , invalid credentials");
    }

    const token = jwt.sign({
        _id: user._id.toString()
    }, process.env.JWT_SECRET_KEY );

      // user.token = token
      // user.password = undefined
      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      })

      // res.send({ user, token , message: "Logged in successfully"});
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
