const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');

router.get('/', (req, res, next) => {
    Contact.find()
      .populate('group')
      .then(contacts => {
        res.status(200).json({
          message: 'Contacts fetched successfully!',
          contacts: contacts
        });
      })
      .catch(error => {
        res.status(500).json({
          message: 'An error occurred',
          error: error
        });
      });
  });

 router.post('/', async (req, res, next) => {
    try {
      const maxContactId = await sequenceGenerator.nextId("contacts");
  
      const contact = new Contact({
        id: maxContactId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl,
        group: req.body.group
      });
  
      const createdContact = await contact.save();
      res.status(201).json({
        message: 'Contact added successfully',
        contact: createdContact
      });
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    }
  });

  router.put('/:id', (req, res, next) => {
    Contact.findOne({ id: req.params.id })
      .then(contact => {
        if (!contact) {
          return res.status(404).json({
            message: 'Contact not found.',
            error: { contact: 'Contact not found' }
          });
        }
  
        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.imageUrl = req.body.imageUrl;
        contact.group = req.body.group;
  
        Contact.updateOne({ id: req.params.id }, contact)
          .then(result => {
            res.status(204).json({
              message: 'Contact updated successfully'
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
    Contact.findOne({ id: req.params.id })
      .then(contact => {
        if (!contact) {
          return res.status(404).json({
            message: 'Contact not found.',
            error: { contact: 'Contact not found' }
          });
        }
  
        Contact.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: 'Contact deleted successfully'
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