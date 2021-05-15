const moment = require('moment'); // Libray for printing timestamp
const Clarifai = require('clarifai'); // Clarifai app for image recognition

const clarifaiApp = new Clarifai.App({
  apiKey: 'a9f14c51e25149479e18ee68eb3fa84b',
});

const handleApiCall = (req, res) => {
  clarifaiApp.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json('unable to work with API', err));
};

const handleImage = (database) => (req, res) => {
  const { id } = req.body;
  database('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      if (entries.length) {
        console.log(
          `${moment().format(
            'MMMM Do YYYY, h:mm:ss a'
          )}: SUCCESS - User id ${id} SUBMITED a new image sucessfully`
        );
        return res.json(entries[0]);
      } else {
        console.log(
          `${moment().format(
            'MMMM Do YYYY, h:mm:ss a'
          )}: HTTP ERROR STATUS 404 - User id ${id} not found`
        );
        return res.status(404).json(`User id ${id} not found`);
      }
    })
    .catch((err) => {
      console.log(`Unable to get entries`);
      res.status(400).json(`Unable to get entries`, err);
    });
};

module.exports = {
  handleApiCall,
  handleImage,
};
