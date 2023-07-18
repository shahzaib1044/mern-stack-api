const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require('cors');

app.use(cors({
  origin: 'https://e-commerce-website-of-nike.vercel.app',
  methods: ['POST'],
  credentials: true,
}));




// ... Rest of your code ...

const { createProxyMiddleware } = require('http-proxy-middleware');

// ...

app.use(
  '/Contactus',
  createProxyMiddleware({
    target: 'https://e-commerce-website-of-nike-api.vercel.app',
    changeOrigin: true,
  })
);


// Database connection
const uri = 'mongodb+srv://shahzebraheel61:shahzaib1044@cluster0.luve38r.mongodb.net/?retryWrites=true&w=majority&ssl=true';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  }); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("Hello");
});

const SignupSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
});

const Signup = mongoose.model('Signup', SignupSchema);

app.post('/Signup', async (req, res) => {
  try {
    let newSignup = new Signup({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address
    });

    newSignup = await newSignup.save();
     res.setHeader('Access-Control-Allow-Origin', 'https://e-commerce-website-of-nike.vercel.app');
    res.send(newSignup);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.post('/Signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const signup = await Signup.findOne({ email, password });

    if (signup) {
      // Signin successful
      res.setHeader('Access-Control-Allow-Origin', 'https://e-commerce-website-of-nike.vercel.app');
      res.sendStatus(200);
    } else {
      // Signin failed
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

const ContactusSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contactus = mongoose.model("Contactus", ContactusSchema);

app.post("/contactus", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContactus = new Contactus({
      name,
      email,
      message,
    });

    const savedContactus = await newContactus.save();
     res.setHeader('Access-Control-Allow-Origin', 'https://e-commerce-website-of-nike.vercel.app');
    res.status(200).json(savedContactus);
  } catch (error) {
    console.error("Failed to save contact message:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const CartItemSchema = new mongoose.Schema({
  image: String,
  name: String,
  size: String,
  price: Number,
});

const PaymentSummaryPageSchema = new mongoose.Schema({
  name: String,
  country: String,
  city: String,
  cartItems: [CartItemSchema],
});

const PaymentSummaryPage = mongoose.model('PaymentSummaryPage', PaymentSummaryPageSchema);

app.post('/PaymentSummaryPage', async (req, res) => {
  try {
    const { name, country, city, cartItems } = req.body;

    const newPaymentSummaryPage = new PaymentSummaryPage({
      name,
      country,
      city,
      cartItems: cartItems.map((item) => ({
        image: item.image,
        name: item.name,
        size: item.size,
        price: item.price,
      })),
    });

    const savedPaymentSummaryPage = await newPaymentSummaryPage.save();
     res.setHeader('Access-Control-Allow-Origin', 'https://e-commerce-website-of-nike.vercel.app');
    res.status(200).json(savedPaymentSummaryPage);
  } catch (error) {
    console.error('Failed to save payment summary:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
