const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const exercisesRoute = require('./path/exercises');
const userRoute = require('./path/users');
const trainingRoute = require('./path/tarinings');


const app = express();

mongoose.connect('mongodb+srv://ivan:' + process.env.MONGO_ATLASS_PW + '@cluster0-5bel1.mongodb.net/training-app', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/images', express.static(path.join('backend/images')));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
      'Access-Control-Allow-Headers',
      'Origins, X-Requested-With, Content-Type, Accept, Authorization'
      );
  res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, DELETE, PUT, PATCH, OPTIONS'
  )
  next();
});

app.use('/api/exercises', exercisesRoute);
app.use('/api/users', userRoute);
app.use('/api/trainings', trainingRoute);


module.exports = app;
