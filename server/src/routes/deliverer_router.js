const express = require('express');

const DelivererController = require('../controller/deliverer_controller');

const router = express.Router();

router.post('/deliverer', DelivererController.createDeliverer);
router.put('/deliverer/:id', DelivererController.updateDeliverer);
router.delete('/deliverer/:id', DelivererController.deleteDeliverer);
router.get('/deliverer/:id', DelivererController.getDelivererById);
router.get('/deliverers', DelivererController.getDeliverers);

module.exports = router;
