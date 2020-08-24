const ProductService = require('../service/product_service');

createProduct = (req, res, next) => {
  ProductService.create(req.body)
    .then(() => {
      return res.status(201).json({
        success: true,
        message: 'Produto criado com sucesso!',
      });
    })
    .catch((err) => next(err));
};

updateProduct = async (req, res, next) => {
  ProductService.update(req.params.id, req.body)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Produto atualizado!',
      });
    })
    .catch((err) => next(err));
};

blockProduct = async (req, res, next) => {
  ProductService.block(req.params.id)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Produto bloqueado!',
      });
    })
    .catch((err) => next(err));
};

unblockProduct = async (req, res, next) => {
  ProductService.unblock(req.params.id)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Produto desbloqueado!',
      });
    })
    .catch((err) => next(err));
};

getProductById = async (req, res, next) => {
  await ProductService.findProduct(req.params.id)
    .then((product) => {
      if (product.blocked == true) {
        return res.status(404).json({
          success: false,
          error: 'Produto bloqueado!',
        });
      }
      return res.status(200).json({
        success: true,
        data: product,
      });
    })
    .catch((err) => next(err));
};

getProducts = async (req, res, next) => {
  await ProductService.findProducts()
    .then((products) => {
      if (!products.length) {
        return res.status(404).json({
          success: false,
          error: 'Produtos não encontrados!',
        });
      }
      return res.status(200).json({
        success: true,
        data: products,
      });
    })
    .catch((err) => next(err));
};

module.exports = {
  createProduct,
  updateProduct,
  blockProduct,
  unblockProduct,
  getProductById,
  getProducts,
};
