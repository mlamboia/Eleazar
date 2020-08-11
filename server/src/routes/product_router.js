const express = require('express');

const ProductController = require('../controller/product_controller');

const router = express.Router();

router.post('/product', ProductController.createProduct);
router.put('/product/:id', ProductController.updateProduct);
router.delete('/product/:id', ProductController.deleteProduct);
router.get('/product/:id', ProductController.getProductById);
router.get('/products', ProductController.getProducts);

module.exports = router;
