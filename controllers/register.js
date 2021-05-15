const moment = require('moment'); // Libray for printing timestamp
const bcrypt = require('bcrypt'); // Allows password encryption using hash

const handleRegister = (database) => (req, res) => {
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
              res.json(user[0]);
              console.log(
                `${moment().format(
                  'MMMM Do YYYY, h:mm:ss a'
                )}: SUCCESS - User ${name} (email:${email}) REGISTERED sucessfully`
              );
            });
        })
        .then(trx.commit)
        .then(trx.rollback)
        .catch((err) => {
          res
            .status(400)
            .json(`Unable to register! - Email "${email}" ALREADY REGISTERED`);
          console.log(
            `${moment().format(
              'MMMM Do YYYY, h:mm:ss a'
            )}: FAIL - User ${name} (email:${email}) ALREADY REGISTERED`
          );
        });
    })
    .catch((err) => {
      res.status(400).json('Unable to register!', err);
    });
};

module.exports = {
  handleRegister,
};
