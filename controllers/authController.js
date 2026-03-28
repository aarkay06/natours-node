const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

exports.signup = catchAsync(async (req, res, next) => {
  console.log('creating usrr');
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });
  console.log(newUser);
  const token = jwt.sign({ id: newUser._id }, process.env.JSW_SECRET_KEY, {
    expiresIn: process.env.JSW_EXPIRES_IN,
  });
  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2) Check if user exists && password is correct
  // We MUST explicitly select('+password') because of select: false in schema
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({ status: 'success', token });
});
