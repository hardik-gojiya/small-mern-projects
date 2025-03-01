import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  console.log(req.body);
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const checkuser = await User.findOne({ email });
  if (checkuser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const user = new User({
      name,
      email,
      phone,
      password: hashPassword,
    });
    await user.save();

    if (!user) {
      return res.status(400).json({ message: "User not created" });
    }

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({ message: "user not define" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ token, message: "User logged in successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export { registerUser, loginUser };
