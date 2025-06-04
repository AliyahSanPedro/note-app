import express from 'express';
import User from '../models/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();


router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    return res
      .status(200)
      .json({ success: true, message: 'Account created successfully' });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: 'Error in adding user' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User doesn't exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: 'Wrong credentials' });
    }

    const token = jwt.sign({ id: user._id }, "secretkeyofnoteapp123@#", {
      expiresIn: '5h'
    });

    return res.status(200).json({
      success: true,
      token,
      user: { name: user.name, email: user.email },
      message: 'Login successful'
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: 'Error in login server' });
  }
});

export default router;
