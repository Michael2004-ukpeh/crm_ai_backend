const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.parseDate = catchAsync(async (req, res, next) => {
  const { date } = req.body;
  if (date) {
    const formattedDate = new Date(date);
    req.body = { ...req.body, date: formattedDate };
    next();
  } else {
    next();
  }
});
