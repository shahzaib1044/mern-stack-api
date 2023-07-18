const mongoose = require('mongoose');
categorySchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    photo:String
})
 ContactusSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

module.exports = mongoose.model('Contactus',ContactusSchema);
