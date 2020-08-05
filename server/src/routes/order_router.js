const express = require('express')

const OrderController = require('../controller/order_controller')

const router = express.Router()

router.post('/order', OrderController.createOrder)
router.put('/order/:id', OrderController.updateOrder)
router.delete('/order/:id', OrderController.deleteOrder)
router.get('/order/:id', OrderController.getOrderById)
router.get('/orders', OrderController.getOrders)
router.get('/order/:id/products', OrderController.getOrderedProducts)

module.exports = router