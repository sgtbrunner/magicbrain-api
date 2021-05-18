const moment = require('moment'); // Libray for printing timestamp
const bcrypt = require('bcrypt'); // Allows password encryption using hash

const { database } = require('../database');

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
                  'MMMM Do YYYY, h:mm:ss a'
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
              'MMMM Do YYYY, h:mm:ss a'
            )}: FAIL - User ${name} (email:${email}) ALREADY REGISTERED`
          );
          res
            .status(err.status || 500)
            .json(`Unable to register! - Email "${email}" ALREADY REGISTERED`);
        });
    })
    .catch((err) => {
      res.status(err.status || 500).json('Unable to register!', err);
    });
};

module.exports = {
  handleRegister,
};
