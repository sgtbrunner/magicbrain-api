const moment = require('moment'); // Libray for printing timestamp
const bcrypt = require('bcrypt'); // Allows password encryption using hash

const { database } = require('../database');
const {
  DEFAULT_DATETIME_FORMAT,
  ERROR_LOG_MESSAGE,
  SERVER_ERROR_MESSAGE,
} = require('../constants');

const handleRegister = (req, res) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  database
    .transaction((trx) => {
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into('login')
        .returning('email')
        .then((loginEmail) => {
          return trx('users')
            .returning('*')
            .insert({
              email: loginEmail[0],
              name: name,
              joined: new Date(),
            })
            .then((user) => {
              console.log(
                `${moment().format(
                  DEFAULT_DATETIME_FORMAT
                )}: SUCCESS - User ${name} (email:${email}) REGISTERED sucessfully`
              );
              res.json(user[0]);
            });
        })
        .then(trx.commit)
        .then(trx.rollback)
        .catch((err) => {
          console.log(
            `${moment().format(
              DEFAULT_DATETIME_FORMAT
            )}: FAIL - User ${name} (email:${email}) ALREADY REGISTERED`
          );
          res.status(400).json({
            error: `Email "${email}" already registered.`,
          });
        });
    })
    .catch((err) => {
      console.log(
        `${moment().format(
          DEFAULT_DATETIME_FORMAT
        )}: ${ERROR_LOG_MESSAGE}`
      );
      res.status(400).json({
        error: SERVER_ERROR_MESSAGE,
      });
    });
};

module.exports = {
  handleRegister,
};
