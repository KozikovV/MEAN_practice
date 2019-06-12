const express = require('express');

const Exercises = require('../scemas/exercise');

const exercisesRoute = express.Router();

exercisesRoute.get('', (req, res, next) => {
  Exercises.find()
    .then(exercisesList => {
      exercisesList.map((exercise) => {
        return {
          title: exercise.title,
          information: exercise.information
        }
      })
      res.status(200).json({exercises: exercisesList})
    });
});

module.exports = exercisesRoute;
