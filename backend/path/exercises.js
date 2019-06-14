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

exercisesRoute.post('/create', (req, res, next) => {
  const exercise = new Exercises(req.body.exercise);

  exercise.save()
    .then((response) => {
      res.status(200).json({
        message: 'create succesfull',
        body: {
          title: response.title,
          information: {
            description: response.information.description,
            targetMuscle: response.information.targetMuscle
          }
        }
      })
    });
});

module.exports = exercisesRoute;
