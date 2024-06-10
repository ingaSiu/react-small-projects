const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;

  // check if we have value for auth
  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  // get the token from authorization split it from tthe word 'bearer'
  const token = authorization.split(' ')[1];

  // verify the token

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    // use the _id from the payload to try and find that user in DB
    req.user = await User.findOne({ _id }).select('_id');

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = requireAuth;
