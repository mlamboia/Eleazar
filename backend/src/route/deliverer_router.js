const express = require('express');

const DelivererController = require('../controller/deliverer_controller');

const router = express.Router();

router.post('/deliverer', DelivererController.createDeliverer);
router.put('/deliverer/:id', DelivererController.updateDeliverer);
router.put('/block_deliverer/:id', DelivererController.blockDeliverer);
router.put('/unblock_deliverer/:id', DelivererController.unblockDeliverer);
router.get('/deliverer/:id', DelivererController.getDelivererById);
router.get('/deliverers', DelivererController.getDeliverers);

module.exports = router;
