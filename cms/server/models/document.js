const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String },
    // children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }] // Array of child documents
});

module.exports = mongoose.model('Document', documentSchema);