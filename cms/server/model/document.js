const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String },
    children: [{ type: Schema.Types.ObjectId, ref: 'Document' }] // Array of child documents
});

const Document = mongoose.model('Document', documentSchema, 'documents');

module.exports = Document;