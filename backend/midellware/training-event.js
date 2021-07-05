const fetch = require('node-fetch');

const Training = require('../scemas/training');

const applicationUrl = 'http://localhost:4200/';

const calendarUrl = 'https://www.googleapis.com/calendar/v3/calendars/';

exports.createTraining = (req, res, next) => {
  if (req.body.training) {
    Training.create(req.body.training)
    .then(
      (training) => {
        if (training) {
          const resTraining = {
            date: training.date,
            trainingId: training._id,
            exercises: training.exercises.map((exercise) => {
              return {
                trainingExerciseId: exercise._id,
                title: exercise.title,
                information: exercise.information,
                reps: exercise.reps,
                count: exercise.count
              }
            })
          };
        createCalendarEvent({
          trainingId: resTraining.trainingId,
          calendarId: req.body.calendarCred.calendar_id,
          calendarToken: req.body.calendarCred.calendar_token,
          calendarEvent: req.body.calendarCred.calendar_event
        });
        res.status(200).json({
          message: 'Training create succesfull',
          body: resTraining,
          date: resTraining.date
        });
      } else {
        res.status(503).json({
          message: 'Ooops, something go wrong!'
        });
      }
  });
  } else {
    res.status(400).json({
      message: 'Training not exist'
    });
  }
}


exports.deleteTraining = (req, res, next) => {
  Training.findByIdAndDelete(req.params.trainingId)
  .then((response) => {
    if (response) {

      res.status(200).json({
        message: 'Training deleted'
      })
    }
  });
}

function createCalendarEvent({trainingId, calendarId, calendarToken, calendarEvent}) {
  const eventContent = Object.assign(calendarEvent, {description: createEventLink(trainingId), summary: 'TRAINING', id: trainingId});
  const calendarRequest = fetch(`${calendarUrl}${calendarId}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${calendarToken}`
    },
    body: JSON.stringify(eventContent)
  });
  return calendarRequest.then((response) => {
    return response.json();
  });
}

function deleteEvent(trainingId) {
  
}

function createEventLink(trainingId) {
  return `${applicationUrl}today-training/${trainingId}`;
}
