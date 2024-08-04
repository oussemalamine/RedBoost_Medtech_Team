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
  const { id } = req.params;

  try {
    // Find the existing entrepreneur by ID
    let entrepreneur = await Entrepreneur.findById(id);
    if (!entrepreneur) {
      return res.status(404).json({ message: 'Entrepreneur not found' });
    }

    // Update only the fields that were changed
    for (const key in req.body) {
      if (req.body[key] !== undefined && req.body[key] !== entrepreneur[key]) {
        entrepreneur[key] = req.body[key];
      }
    }

    // Save the updated entrepreneur
    entrepreneur = await entrepreneur.save();

    res.status(200).json(entrepreneur);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get filtered entrepreneurs' emails by gender and region
router.get('/filterEntrepreneurs', async (req, res) => {
  const { gender, region } = req.query;

  try {
    let query = {};
    if (gender) query.gender = gender;
    if (region) query.region = region;

    const entrepreneurs = await Entrepreneur.find(query).select('email -_id');
    const emails = entrepreneurs.map(entrepreneur => entrepreneur.email);

    res.status(200).json(emails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Route to delete an entrepreneur by ID
router.delete('/deleteEntrepreneur/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Received DELETE request for entrepreneur ID: ${id}`);
  try {
    const entrepreneur = await Entrepreneur.findByIdAndDelete(id);
    if (!entrepreneur) {
      return res.status(404).json({ message: 'Entrepreneur not found' });
    }
    res.status(200).json({ message: 'Entrepreneur deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }


});

module.exports = router;
