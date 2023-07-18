const express = require('express');
const router = express.Router();
const Contactus = require('../model/Contactus');

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContactus = new Contactus({
      name,
      email,
      message,
    });

    const savedContactus = await newContactus.save();
    
    res.status(200).json(savedContactus);
  } catch (error) {
    console.error("Failed to save contact message:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
