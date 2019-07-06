const mongoose = require('mongoose');


const trainingScema = mongoose.Schema({
  date: {type: String, require: true},
  exercises: {type: [{
    title: { type: String, require: true},
    information: {
      description: {type: String, require: true},
      targetMuscle: {type: [String], require: true}
    }
  }], require: true}
})

module.exports = mongoose.model('Training', trainingScema);
