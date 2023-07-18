const mongoose = require('mongoose');

const ContactusSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

module.exports = mongoose.model('Contactus',ContactusSchema);
