const mongoose = require('mongoose');

const birdSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  dateSeen: { type: Date, required: true },
  locationSeen: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

module.exports = mongoose.model('Bird', birdSchema);