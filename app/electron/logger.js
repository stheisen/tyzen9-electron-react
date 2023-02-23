/* eslint-disable no-shadow */
const { createLogger, format, transports } = require('winston');
const path = require('path');
const { app } = require('electron');
require('winston-daily-rotate-file');

const { timestamp, label, printf } = format;
const isDev = process.env.NODE_ENV === 'development';

// Winston supports the following 6 log levels
// error:   0
// warn:    1
// info:    2
// http:    3
// verbose: 4
// debug:   5
// silly:   6

// The environment will determine the log file path
let logPath;
if (isDev) {
  logPath = path.resolve(__dirname, '../../logs');
} else {
  logPath = path.resolve(app.getPath('userData'), 'Logs');
}

// Create the logFormat for the console
const consoleLogFormat = printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`);

// Create the logFormat for the rotating log files
const logfileFormat = printf(({ timestamp, level, message }) => {
  const messageVal = message.replace(/[""]/g, '\\"');
  return `{"timestamp":"${timestamp}","level":"${level}","message":"${messageVal}"}`;
});

// Configure logging to a file
const fileTransport = new transports.DailyRotateFile({
  level: 'http',
  dirname: logPath,
  filename: 'jtc-%DATE%.log',
  datePattern: 'YYYYMMDD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '7d',
  format: format.combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logfileFormat,
  ),
});

// Configure the logging to the console
const consoleTransport = new transports.Console({
  level: 'silly',
  format: format.combine(
    format.colorize(),
    label({ label: 'JTC', message: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    consoleLogFormat,
  ),
});

// Enable the file logger, and add the console loader if we are in developmet mode.
const logger = createLogger();
logger.add(fileTransport);
if (isDev) logger.add(consoleTransport);

module.exports = logger;
