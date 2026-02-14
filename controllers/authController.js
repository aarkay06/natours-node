const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');
const jsw = require('jsonwebtoken');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  const token = jsw.sign({ id: newUser._id }, process.env.JSW_SECRET_KEY, {
    expiresIn: process.env.JSW_EXPIRES_IN,
  });
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});
