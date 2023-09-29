module.exports = function (
  data,
  res,
  statusCode,
  options = {
    result: false,
    message: false,
    token: false,
  }
) {
  res.status(statusCode).json({
    status: 'success',
    result: options.result ? data.length : undefined,
    message: options.message ? options.message : undefined,
    token: options.token ? options.token : undefined,
    data: {
      data,
    },
  });
};
