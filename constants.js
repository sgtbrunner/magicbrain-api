const PORT = process.env.PORT || 5000;

const DEFAULT_DATETIME_FORMAT = 'MMMM Do YYYY, h:mm:ss a';
const ERROR_LOG_MESSAGE =
  'HTTP ERROR STATUS 400 - Bad Request: Error on database transaction';
const INVALID_USERNAME_PASSWORD_ERROR_MESSAGE =
  'You have entered an invalid username and/or password';
const INVALID_USERNAME_PASSWORD_LOG_ERROR =
  'HTTP ERROR STATUS 401 - Invalid user and/or password`';
const SERVER_ERROR_MESSAGE = 'Oooopsss...An error occurred on the server.';

module.exports = {
  PORT,
  DEFAULT_DATETIME_FORMAT,
  ERROR_LOG_MESSAGE,
  INVALID_USERNAME_PASSWORD_ERROR_MESSAGE,
  INVALID_USERNAME_PASSWORD_LOG_ERROR,
  SERVER_ERROR_MESSAGE,
};
