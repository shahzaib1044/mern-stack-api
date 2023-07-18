const express = require('express');
const app = express();
const productRoute = require('./api/routes/product');
const userRoute = require('./api/routes/user');
const categoryPath = require('./api/routes/category');
const mongoose = require('mongoose');
const { urlencoded, json } = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const uri = 'mongodb+srv://shahzebraheel61:shahzaib1044@cluster0.luve38r.mongodb.net/?retryWrites=true&w=majority&ssl=true';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(fileUpload({
  useTempFiles: true
}));

app.use(cors());

app.use('/product', productRoute);
app.use('/user', userRoute);
app.use('/category', categoryPath);

app.get('*', (req, res, next) => {
  res.status(404).json({
    message: 'Bad request'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

module.exports = app;
