const express = require('express');

const ClientController = require('../controller/client_controller');

const router = express.Router();

router.post('/client', ClientController.createClient);
router.put('/client/:id', ClientController.updateClient);
router.put('/block_client/:id', ClientController.blockClient);
router.put('/unblock_client/:id', ClientController.unblockClient);
router.get('/client/:id', ClientController.getClientById);
router.get('/clients', ClientController.getClients);

module.exports = router;
