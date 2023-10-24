const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.parseBoolean = catchAsync(async (req, res, next) => {
  const { isCancelled } = req.query;

  if (isCancelled === 'true') {
    let formattedIsCancelled = true;
    req.query.isCancelled = formattedIsCancelled;
  } else if (isCancelled === 'false') {
    let formattedIsCancelled = false;
    req.query.isCancelled = formattedIsCancelled;
  } else {
    delete req.query.isCancelled;
  }

  next();
});
