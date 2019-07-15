const mongoose = require('mongoose');


const trainingSchema = mongoose.Schema({
  date: {type: String, require: true},
  exercises: {type: [{
    type: {type: String, require: true},
    title: { type: String, require: true},
    information: {
      description: {type: String, require: true},
      targetMuscle: {type: [String], require: true}
    },
    reps: {type: Number, require: true},
    count: {type: String, require: true}
  }], require: true}
})

module.exports = mongoose.model('Training', trainingSchema);
