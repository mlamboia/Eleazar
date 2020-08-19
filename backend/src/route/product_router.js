const express = require('express');

const ProductController = require('../controller/product_controller');

const router = express.Router();

router.post('/product', ProductController.createProduct);
router.put('/product/:id', ProductController.updateProduct);
router.put('/block_product/:id', ProductController.blockProduct);
router.put('/block_product/:id', ProductController.unblockProduct);
router.get('/product/:id', ProductController.getProductById);
router.get('/products', ProductController.getProducts);

module.exports = router;
