const mongoose = require('mongoose');

const exerciseScema = mongoose.Schema({
  title: { type: String, require: true},
  information: {
    description: {type: String, require: true},
    targetMuscle: {type: [String], require: true}
  }
});

module.exports = mongoose.model('Exercises', exerciseScema);
