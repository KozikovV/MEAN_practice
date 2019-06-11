const express = require('express');

const Exercises = require('../scemas/exercise');

const exercisesRoute = express.Router();

exercisesRoute.get('', (req, res, next) => {
  Exercises.find()
    .then(document => res.status(200).json({exercises: document}));
});

module.exports = exercisesRoute;
