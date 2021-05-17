const moment = require('moment'); // Libray for printing timestamp
const bcrypt = require('bcrypt'); // Allows password encryption using hash

const { database } = require('../database');

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
              `${moment().format('MMMM Do YYYY, h:mm:ss a')}: SUCCESS - User ${
                user[0].name
              } SIGNED-IN sucessfully`
            );
            return res.json(user[0]);
          })
          .catch((err) => {
            console.log(`Server unable to return user: ${err}`);
            res.status(400).json(`Server unable to return user: ${err}`);
          });
      } else {
        console.log(
          `${moment().format(
            'MMMM Do YYYY, h:mm:ss a'
          )}: HTTP ERROR STATUS 400 - Invalid user and/or password`
        );
        return res
          .status(400)
          .json(`HTTP ERROR STATUS 400  - Invalid user and/or password`);
      }
    })
    .catch((err) => {
      console.log(
        `${moment().format(
          'MMMM Do YYYY, h:mm:ss a'
        )}: HTTP ERROR STATUS 400 - Invalid user and/or password`
      );
      return res
        .status(400)
        .json(`HTTP ERROR STATUS 400  - Invalid user and/or password`, err);
    });
};

module.exports = {
  handleSignIn: handleSignIn,
};
