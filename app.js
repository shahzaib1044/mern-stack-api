const express = require('express');
const app = express();
const productRoute = require('./api/routes/product');
const userRoute = require('./api/routes/user');
const categorypath = require('./api/routes/category')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(fileUpload({
  useTempFiles:true
}))

app.use(cors());

app.use('/product',productRoute);
app.use('/user',userRoute);
app.use('/category',categorypath);

app.get('*',(req,res,next)=>{
  res.status(200).json({
    message:'bad request'
  })
})

module.exports = app;
