const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'You forgot your email!'],
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: 'AN invalid email!',
    },
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please iniput a password'],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please iniput a password'],
    minlength: 8,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'The passwords are not the same!',
    },
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
