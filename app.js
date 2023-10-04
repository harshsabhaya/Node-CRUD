const express = require('express');
const boolParser = require('express-query-boolean');

const app = express();
app.use(express.json());
app.use(boolParser());
require('dotenv').config();
const expressWinston = require('express-winston');

const birds = require('./src/controller/birds');
const main = require('./src/controller/main');
const logs = require('./src/controller/logs');
const error = require('./src/controller/error');
const books = require('./src/controller/books/books.route');

const { globalErrorHandler, AppError } = require('./src/utils/errorController');
const { transports, format } = require('winston');
const logger = require('./src/logs/logger');

app.use(
  expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true,
  })
);

app.use('/', main);
app.use('/error', error);
app.use('/birds', birds);
app.use('/logs', logs);
app.use('/api/books', books);

app.all('*', (req, res, next) => {
  const error = new AppError('Path is not available', 404);
  next(error);
});

const errorFormat = format.printf(({ level, timestamp, meta }) => {
  return `${timestamp} ${level}: ${meta.message}`;
});

app.use(
  expressWinston.errorLogger({
    transports: [
      new transports.File({
        filename: './src/logs/logsInternalErrors.log',
      }),
    ],
    format: format.combine(format.json(), format.timestamp(), errorFormat),
  })
);

app.use(globalErrorHandler);

// app.use
app.listen(process.env.HTTP_PORT, () => {
  console.log(`App is listening on port ${process.env.HTTP_PORT}`);
});

module.exports = app;
