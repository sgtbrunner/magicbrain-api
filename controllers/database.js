const moment = require('moment'); // Libray for printing timestamp

const handleServerStatus = (req, res) => {
  console.log(
    `${moment().format(
      'MMMM Do YYYY, h:mm:ss a'
    )}: SUCCESS - Heroku is working!`
  );
  return res.send('it is working!');
};

module.exports = {
    handleServerStatus,
}