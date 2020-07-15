const express = require('express')
const bodyParser = require('body-parser').json()

const ContactController = require('../controller/contact_controller')

const router = express.Router()

router.post('/contact', bodyParser, function(req, res){ 
  console.log(req.body)
})
router.put('/contact/:id', ContactController.updateContact)
router.delete('/contact/:id', ContactController.deleteContact)
router.get('/contact/:id', ContactController.getContactById)
router.get('/contacts', ContactController.getContacts)

module.exports = router