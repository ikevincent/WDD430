var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const contactSchema = new Schema({
   name: { type: String, required: true },
   email: { type: String, required: true },
   phone: { type: String, required: true },
   imageUrl: { type: String },
   group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }]
});

module.exports = mongoose.model('Contact', contactSchema);