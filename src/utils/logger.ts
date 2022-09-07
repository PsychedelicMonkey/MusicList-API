import { createLogger, format, transports } from 'winston';
const { colorize, combine, printf, timestamp } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.File({ dirname: 'logs', filename: 'debug.log' }),
    new transports.File({
      dirname: 'logs',
      filename: 'error.log',
      level: 'error',
    }),
  ],
});

logger.add(
  new transports.Console({
    level: 'debug',
    format: combine(colorize(), logFormat),
  })
);

export default logger;
