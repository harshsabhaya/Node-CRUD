const mongoose = require('mongoose');

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    const codes = {
      200: 'Ok',
      201: 'Created',
      202: 'Accepted',
      204: 'No Content',
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      405: 'Method Not Allowed',
      406: 'Not Acceptable',
      409: 'Conflict',
      500: 'Internal Server Error',
      503: 'Service Unavailable',
    };

    if (statusCode in codes) {
      this.statusCode = statusCode;
    } else {
      this.statusCode = 500;
    }

    if (!message) {
      this.message = codes[statusCode];
    }
  }
}

function globalErrorHandler(error, req, res, next) {
  error.statusCode = error?.statusCode || 500;
  res.status(error.statusCode).send({
    error: {
      status: error.statusCode,
      message: error?.message,
    },
  });
}

// Only wrap async function with this function
function asyncErrorHandler(func) {
  return (req, res, next) => {
    func(req, res, next).catch((err) => {
      if (err instanceof mongoose.CastError) {
        next(new AppError('Invalid request', 400));
        return;
      }
      next(err);
    });
  };
}

module.exports = {
  globalErrorHandler,
  asyncErrorHandler,
  AppError,
};
