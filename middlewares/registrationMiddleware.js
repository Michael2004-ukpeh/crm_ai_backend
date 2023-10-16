const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.parseBoolean = catchAsync(async (req, res, next) => {
  const { isCancelled } = req.query;
  const formattedIsCancelled = isCancelled === 'true' ? true : false;
  console.log(formattedIsCancelled);
  req.query.isCancelled = formattedIsCancelled;

  next();
});
