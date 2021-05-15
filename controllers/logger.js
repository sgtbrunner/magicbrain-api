const moment = require('moment'); // Libray for printing timestamp

const { PORT } = require('../constants');

const logger = (req, res, next) => {
  console.log(
    `${moment().format('MMMM Do YYYY, h:mm:ss a')}: Attempt to ${
      req.method
    } from/to SERVER at ${req.hostname}:${PORT}${req.originalUrl}`
  );
  next();
};

module.exports = {
  logger,
};
