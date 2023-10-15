const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/sendResponse');

const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = async (data, statusCode, res, next) => {
  const token = signToken(data._id);
  data.password = undefined;
  sendResponse(data, res, statusCode, {
    token,
  });
};

const createAndSendTokenWithEmail = async (
  data,
  statusCode,
  res,
  next,
  emailOptions = {
    subject: 'Account Login',
    message: `Dear ${data.firstName}, Your account was recently logged in`,
    email: data.email,
  }
) => {
  //   Sign Token
  const token = signToken(data._id);

  // Set Cookie to be sent over https if we're in production

  // Send Token as cookie
  // Send Email Noification
  // try {
  //   await sendEmail(emailOptions);
  // } catch (err) {
  //   return next(new AppError('Unable to send email. Please try again', 400));
  // }
  // Send Response
  sendResponse(data, res, statusCode, { token });
};

const signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
  });
  createAndSendToken(newUser, 201, res, next);
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError(' Email or Password is incorrect', 401));
    }

    const token = signToken(user._id);
    res.status(200).json({ status: 'success', token, data: user });
  } else {
    next(new AppError('Please provide email and password', 401));
  }
});

const protect = catchAsync(async (req, res, next) => {
  let token = null;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError(
        'You are not logged in! please log in to access this resource',
        401
      )
    );
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("Can't find user with that token. Please try again", 401)
    );
  }
  req.user = currentUser;
  next();
});

module.exports = {
  signToken,
  signup,
  login,
  protect,
};
