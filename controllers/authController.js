const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');
const jsw = require('jsonwebtoken');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,

    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
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
