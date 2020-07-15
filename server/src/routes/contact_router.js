const express = require('express')

const ContactController = require('../controller/contact_controller')

const router = express.Router()

router.post('/contact', ContactController.createContact)
router.put('/contact/:id', ContactController.updateContact)
router.delete('/contact/:id', ContactController.deleteContact)
router.get('/contact/:id', ContactController.getContactById)
router.get('/contacts', ContactController.getContacts)
router.delete('/contacts/delete_all', ContactController.deleteAll)

module.exports = router