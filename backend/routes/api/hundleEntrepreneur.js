const express = require('express');
const router = express.Router();
const Entrepreneur = require('../../database/models/entrepreneurSchema');

router.post('/createntrepreneurs', async (req, res) => {
  try {
    const entrepreneur = new Entrepreneur(req.body);
    await entrepreneur.save();
    res.status(201).send(entrepreneur);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to get all entrepreneurs
router.get('/loadAllentrepreneurs', async (req, res) => {
  try {
    const entrepreneurs = await Entrepreneur.find();
    res.json(entrepreneurs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
