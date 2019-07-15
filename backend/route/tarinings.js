const express = require('express');

const trainingRoute = express.Router();

const Training = require('../scemas/training');
const controller = require('../midellware/training-event');

trainingRoute.post('/create', controller.createTraining);

trainingRoute.get('', (req, res, next) => {
  Training.find()
  .then((trainings) => {
    if (trainings) {
      trainings = trainings.map((training) => {
        return {
          date: training.date,
          trainingId: training._id,
          exercises: training.exercises.map((exercise) => {
            return {
              trainingExerciseId: exercise._id,
              title: exercise.title,
              information: exercise.information
            }
          })
        };
      })
      res.status(200).json({
        body: trainings
      });
    }
  });
});

trainingRoute.get('/:trainingId', (req, res, next) => {
  Training.findById(req.params.trainingId)
  .then((training) => {
    if (training) {
      const resTraining = {
        date: training.date,
        trainingId: training._id,
        exercises: training.exercises.map((exercise) => {
          return {
            trainingExerciseId: exercise._id,
            title: exercise.title,
            information: exercise.information
          }
        })
      };
      res.status(200).json({
        body: resTraining
      });
    }
  });
});

trainingRoute.delete('/:trainingId/delete', (req, res, next) => {
  Training.findByIdAndDelete(req.params.trainingId)
  .then((response) => {
    if (response) {
      res.status(200).json({
        message: 'Training deleted'
      })
    }
  })
});

module.exports = trainingRoute;
