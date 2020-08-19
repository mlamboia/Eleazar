const express = require('express');

const ContactController = require('../controller/contact_controller');

const router = express.Router();

router.post('/contact', ContactController.createContact);
router.put('/contact/:id', ContactController.updateContact);
router.put('/block_contact/:id', ContactController.blockContact);
router.put('/unblock_contact/:id', ContactController.unblockContact);
router.get('/contact/:id', ContactController.getContactById);
router.get('/contacts', ContactController.getContacts);

module.exports = router;
