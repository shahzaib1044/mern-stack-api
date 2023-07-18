const mongoose = require('mongoose');


 CartItemSchema = new mongoose.Schema({
  image: String,
  name: String,
  size: String,
  price: Number,
});

 PaymentSummaryPageSchema = new mongoose.Schema({
  name: String,
  country: String,
  city: String,
  cartItems: [CartItemSchema],
});

module.exports = mongoose.model('PaymentSummaryPage',PaymentSummaryPageSchema);
