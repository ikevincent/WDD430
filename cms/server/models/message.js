var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const messageSchema = new Schema({
   subject: { type: String },
   msgText: { type: String, required: true },
   sender: { type: mongoose.Schema.Types.ObjectId, ref:'Contact' }
});

module.exports = mongoose.model('Message', messageSchema);