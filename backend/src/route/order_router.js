const express = require('express');

const OrderController = require('../controller/order_controller');

const router = express.Router();

router.post('/order', OrderController.createOrder);
router.put('/order/:id', OrderController.updateOrder);
router.get('/order/:id', OrderController.getOrderById);
router.get('/orders', OrderController.getOrders);

module.exports = router;
