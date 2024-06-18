import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // allowed to do this because of cookie parser
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // we get access to userId because we genereted the token and passed userId
      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, invalid token');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };
