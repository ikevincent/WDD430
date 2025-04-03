const express = require('express');
const router = express.Router();
const Bird = require('../models/bird');
const mongoose = require('mongoose');

// Get all birds
router.get('/', async (req, res) => {
  try {
    const birds = await Bird.find();
    res.json(birds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new bird
router.post('/', async (req, res) => {
  const bird = new Bird({
    name: req.body.name,
    description: req.body.description,
    dateSeen: req.body.dateSeen,
    locationSeen: req.body.locationSeen,
    imageUrl: req.body.imageUrl
  });

  try {
    const newBird = await bird.save();
    res.status(201).json(newBird);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a bird
router.put('/:id', async (req, res) => {
  try {
    const bird = await Bird.findById(req.params.id);
    if (!bird) return res.status(404).json({ message: 'Bird not found' });

    bird.name = req.body.name;
    bird.description = req.body.description;
    bird.dateSeen = req.body.dateSeen;
    bird.locationSeen = req.body.locationSeen;
    bird.imageUrl = req.body.imageUrl;

    const updatedBird = await bird.save();
    res.json(updatedBird);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a bird
router.delete('/:id', async (req, res) => {
  try {
    const bird = await Bird.findById(req.params.id);
    if (!bird) return res.status(404).json({ message: 'Bird not found' });

    await bird.remove();
    res.json({ message: 'Bird deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;