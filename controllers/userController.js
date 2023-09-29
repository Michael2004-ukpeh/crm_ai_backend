const User = require('./../models/userModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handleFactory');

exports.getAllUsers = factory.getAll(User);

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select(
    '-password -confirmPassword -passwordChangedAt'
  );

  res.status(200).json({ status: 'success', doc: { user, profile } });
});

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;

  next();
});
