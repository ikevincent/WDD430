const Sequence = require('../model/sequence');

let maxDocumentId;
let maxMessageId;
let maxContactId;
let sequenceId = null;

class SequenceGenerator {
  constructor() {
    this.init();
  }

  async init() {
    try {
      const sequence = await Sequence.findOne().exec();
      if (sequence) {
        sequenceId = sequence._id;
        maxDocumentId = sequence.maxDocumentId;
        maxMessageId = sequence.maxMessageId;
        maxContactId = sequence.maxContactId;
      }
    } catch (err) {
      console.error('An error occurred during initialization:', err);
    }
  }

  async nextId(collectionType) {
    let updateObject = {};
    let nextId;

    switch (collectionType) {
      case 'documents':
        maxDocumentId++;
        updateObject = { maxDocumentId: maxDocumentId };
        nextId = maxDocumentId;
        break;
      case 'messages':
        maxMessageId++;
        updateObject = { maxMessageId: maxMessageId };
        nextId = maxMessageId;
        break;
      case 'contacts':
        maxContactId++;
        updateObject = { maxContactId: maxContactId };
        nextId = maxContactId;
        break;
      default:
        return -1;
    }

    try {
      await Sequence.updateOne({ _id: sequenceId }, { $set: updateObject }).exec();
    } catch (err) {
      console.error('nextId error:', err);
      return null;
    }

    return nextId;
  }
}

module.exports = new SequenceGenerator();