const moment = require('moment'); // Libray for printing timestamp
const Clarifai = require('clarifai'); // Clarifai app for image recognition

const { database } = require('../database');
const { API_KEY } = require('../config');
const {
  DEFAULT_DATETIME_FORMAT,
  ERROR_LOG_MESSAGE,
  SERVER_ERROR_MESSAGE,
} = require('../constants');

const clarifaiApp = new Clarifai.App({
  apiKey: API_KEY,
});

const handleApiCall = (req, res) => {
  clarifaiApp.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      console.log(
        `${moment().format(
          DEFAULT_DATETIME_FORMAT
        )}: SUCCESS - Clarifai api retrieved new image boundaries sucessfully`
      );
      res.json(data);
    })
    .catch((err) => {
      console.log(
        `${moment().format(
          DEFAULT_DATETIME_FORMAT
        )}: FAIL - Unable to work with Clarifai API`
      );
      res.status(400).json({
        error:
          'Unable to detect faces on selected image. Please check your url and try again.',
      });
    });
};

const handleImage = (req, res) => {
  const { id } = req.body;
  database('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      if (entries.length) {
        console.log(
          `${moment().format(
            DEFAULT_DATETIME_FORMAT
          )}: SUCCESS - User id ${id} SUBMITED a new image sucessfully`
        );
        return res.json({ count: entries[0] });
      } else {
        console.log(
          `${moment().format(
            DEFAULT_DATETIME_FORMAT
          )}: HTTP ERROR STATUS 400 - Unable to process user entries`
        );
        return res.status(400).json({
          error: 'Unable to update your image count. Please try again later',
        });
      }
    })
    .catch((err) => {
      console.log(
        `${moment().format(DEFAULT_DATETIME_FORMAT)}: ${ERROR_LOG_MESSAGE}`
      );
      res.status(400).json({
        error: SERVER_ERROR_MESSAGE,
      });
    });
};

module.exports = {
  handleApiCall,
  handleImage,
};
