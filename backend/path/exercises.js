const express = require('express');

const Exercises = require('../scemas/exercise');
const calendar = require('../calendar/calendar-api');
const exercisesRoute = express.Router();

exercisesRoute.get('', (req, res, next) => {
  calendar.calendarAut();
  Exercises.find()
    .then(exercisesList => {
      exercisesList = exercisesList.map((exercise) => {
        return {
          exercisesId: exercise._id,
          title: exercise.title,
          information: exercise.information
        }
      });
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

exercisesRoute.delete('/delete/:exerciseId', (req, res, next) => {
  Exercises.findByIdAndDelete(req.params.exerciseId)
  .then((result) => {
    res.status(200).json({
      message: 'Deleted: ' + req.params.exerciseId
    })
  })
  .catch((err) => {
    res.status(404).json({
      message: 'Not Found'
    })
  });
});

exercisesRoute.put('/edit/:exerciseId', (req, res, next) => {
  let exercise = req.body;
  exercise.information.targetMuscle = exercise.information.targetMuscle.filter((muscle) => {
    return muscle.length;
  })
  Exercises.findByIdAndUpdate(req.params.exerciseId, {$set: exercise}, (err, response) => {
    if (err) {
      return;
    } else {
      res.status(200).json({
        message: exercise
      });
    }
  })
});

module.exports = exercisesRoute;
