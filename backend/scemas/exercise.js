const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
  type: {type: String, require: true},
  title: { type: String, require: true},
  information: {
    description: {type: String, require: true},
    targetMuscle: {type: [String], require: true}
  }
});


module.exports = mongoose.model('Exercises', exerciseSchema);
