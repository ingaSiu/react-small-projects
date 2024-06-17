import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

// all the model methods return a promise!

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // check for email and psw
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// route    POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user
// route    POST /api/users/logout
// @access  Public

const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Logout user' });
});

// @desc    Get user profile
// route    GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'User profile' });
});

// @desc    Update user profile
// route    Put /api/users/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Update user profile' });
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile };
