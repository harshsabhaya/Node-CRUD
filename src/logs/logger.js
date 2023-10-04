const { createLogger, format, transports } = require('winston');
const path = require('path');

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      level: 'error',
      filename: path.resolve(__dirname, 'errorLogs.log'),
    }),
    new transports.File({
      level: 'warn',
      filename: path.resolve(__dirname, 'warnLogs.log'),
    }),
  ],
  format: format.combine(
    format.json(),
    format.timestamp(),
    format.metadata()
    // format.prettyPrint()
  ),
});

module.exports = logger;
