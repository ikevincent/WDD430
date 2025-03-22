const express = require('express');
const router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Document = require('../models/document');


// Route to fetch all documents
router.get('/', async (req, res) => {
  try {
    const documents = await Document.find();  // Fetch all documents from the database
    res.json(documents);  // Send the documents as a response
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ message: 'Error fetching documents' });
  }
});

 router.post('/', async (req, res, next) => {
    try {
      const maxDocumentId = await sequenceGenerator.nextId("documents");
  
      const document = new Document({
        id: maxDocumentId,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url
      });
  
      const createdDocument = await document.save();
      res.status(201).json({
        message: 'Document added successfully',
        document: createdDocument
      });
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    }
  });

  router.put('/:id', (req, res, next) => {
    Document.findOne({ id: req.params.id })
      .then(document => {
        if (!document) {
          return res.status(404).json({
            message: 'Document not found.',
            error: { document: 'Document not found' }
          });
        }
  
        document.name = req.body.name;
        document.description = req.body.description;
        document.url = req.body.url;
  
        Document.updateOne({ id: req.params.id }, document)
          .then(result => {
            res.status(204).json({
              message: 'Document updated successfully'
            });
          })
          .catch(error => {
            res.status(500).json({
              message: 'An error occurred',
              error: error
            });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'An error occurred',
          error: error
        });
      });
  });

  router.delete('/:id', (req, res, next) => {
    Document.findOne({ id: req.params.id })
      .then(document => {
        if (!document) {
          return res.status(404).json({
            message: 'Document not found.',
            error: { document: 'Document not found' }
          });
        }
  
        Document.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: 'Document deleted successfully'
            });
          })
          .catch(error => {
            res.status(500).json({
              message: 'An error occurred',
              error: error
            });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'An error occurred',
          error: error
        });
      });
  });


module.exports = router; 