const moment = require('moment'); // Libray for printing timestamp
const bcrypt = require('bcrypt'); // Allows password encryption using hash

const { database } = require('../database');

const {
  DEFAULT_DATETIME_FORMAT,
  ERROR_LOG_MESSAGE,
  INVALID_USERNAME_PASSWORD_ERROR_MESSAGE,
  INVALID_USERNAME_PASSWORD_LOG_ERROR,
  SERVER_ERROR_MESSAGE,
} = require('../constants');

const handleSignIn = (req, res) => {
  const { email, password } = req.body;
  database
    .select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return database
          .select('*')
          .from('users')
          .where('email', '=', email)
          .then((user) => {
            console.log(
              `${moment().format(DEFAULT_DATETIME_FORMAT)}: SUCCESS - User ${
                user[0].name
              } SIGNED-IN sucessfully`
            );
            return res.json(user[0]);
          })
          .catch((err) => {
            console.log(
              `${moment().format(
                DEFAULT_DATETIME_FORMAT
              )}: HTTP ERROR STATUS 500 - Internal Server Error`
            );
            res.status(500).json(`Server unable to return user`);
          });
      } else {
        console.log(
          `${moment().format(
            DEFAULT_DATETIME_FORMAT
          )}: ${INVALID_USERNAME_PASSWORD_LOG_ERROR}`
        );
        return res.status(401).json({
          error: INVALID_USERNAME_PASSWORD_ERROR_MESSAGE,
        });
      }
    })
    .catch((err) => {
      if (
        String(err) === `TypeError: Cannot read property 'hash' of undefined`
      ) {
        console.log(
          `${moment().format(
            DEFAULT_DATETIME_FORMAT
          )}: ${INVALID_USERNAME_PASSWORD_LOG_ERROR}`
        );
        return res.status(401).json({
          error: INVALID_USERNAME_PASSWORD_ERROR_MESSAGE,
        });
      }
      console.log(
        `${moment().format(DEFAULT_DATETIME_FORMAT)}: ${ERROR_LOG_MESSAGE}`
      );
      return res.status(400).json({
        error: SERVER_ERROR_MESSAGE,
      });
    });
};

module.exports = {
  handleSignIn: handleSignIn,
};
