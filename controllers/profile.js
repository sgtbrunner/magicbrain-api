const moment = require('moment'); // Libray for printing timestamp

const handleProfileGet = (database) => (req, res) => {
  const { id } = req.params;
  database('users')
    .where('id', '=', id)
    .then((user) => {
      if (user.length) {
        console.log(
          `${moment().format('MMMM Do YYYY, h:mm:ss a')}: SUCCESS - user's ${
            user[0].name
          } (id ${id}) info RETRIEVED sucessfully`
        );
        return res.json(user[0]);
      } else {
        console.log(
          `${moment().format(
            'MMMM Do YYYY, h:mm:ss a'
          )}: HTTP ERROR STATUS 404 - User id ${id} not found`
        );
        return res
          .status(404)
          .json(`HTTP ERROR STATUS 404 - User id ${id} not found`);
      }
    })
    .catch((err) => {
      console.log(`Unable to get profile`, err);
      res.status(400).json(`Unable to get profile`);
    });
};

module.exports = {
  handleProfileGet,
};
