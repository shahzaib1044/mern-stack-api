const mongoose = require('mongoose');

SignupSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
});
module.exports = mongoose.model('Signup',SignupSchema);
