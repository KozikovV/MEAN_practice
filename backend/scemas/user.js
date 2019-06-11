const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {type: String, require: true},
  surname: {type: String, require: true},
  nickName: {type: String, require: true},
  email: {type: String, require: true},
  age: {type: Number, require: true},
  weight: {type: Number, require: true},
  height: {type: Number, require: true},
  image: {type: String, require: true},
  password: {type: String, require: true}
});

module.exports = mongoose.model('User', userSchema);
