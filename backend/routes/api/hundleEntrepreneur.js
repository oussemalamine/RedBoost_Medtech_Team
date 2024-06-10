const express = require('express');
const router = express.Router();
const Entrepreneur = require('../../database/models/entrepreneurSchema');

// Route to create a new entrepreneur
router.post('/createntrepreneurs', async (req, res) => {
  const { nom, prenom, email, nombreCofondateurs, nombreCofondateursFemmes } = req.body;

  if (!nom || !prenom || !email || nombreCofondateurs === undefined || nombreCofondateursFemmes === undefined) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (Number(nombreCofondateursFemmes) > Number(nombreCofondateurs)) {
    return res.status(400).json({ message: 'Nombre Cofondateurs Femmes cannot be greater than Nombre Cofondateurs.' });
  }

  try {
    const entrepreneur = new Entrepreneur(req.body);
    await entrepreneur.save();
    res.status(201).json(entrepreneur);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get all entrepreneurs
router.get('/loadAllEntrepreneurs', async (req, res) => {
  try {
    const entrepreneurs = await Entrepreneur.find();
    res.status(200).json(entrepreneurs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to get a single entrepreneur by ID
router.get('/entrepreneur/:id', async (req, res) => {
  try {
    const entrepreneur = await Entrepreneur.findById(req.params.id);
    if (!entrepreneur) {
      return res.status(404).json({ message: 'Entrepreneur not found' });
    }
    res.status(200).json(entrepreneur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update an entrepreneur by ID
router.put('/updateEntrepreneur/:id', async (req, res) => {
  try {
    const entrepreneur = await Entrepreneur.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!entrepreneur) {
      return res.status(404).json({ message: 'Entrepreneur not found' });
    }
    res.status(200).json(entrepreneur);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete an entrepreneur by ID
router.delete('/deleteEntrepreneur/:id', async (req, res) => {
  try {
    const entrepreneur = await Entrepreneur.findByIdAndDelete(req.params.id);
    if (!entrepreneur) {
      return res.status(404).json({ message: 'Entrepreneur not found' });
    }
    res.status(200).json({ message: 'Entrepreneur deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
