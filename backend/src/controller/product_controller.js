const ProductService = require('../service/product_service');

createProduct = (req, res, next) => {
  new ProductService(req)
    .create()
    .then(() => {
      return res.status(201).json({
        success: true,
        message: 'Produto criado com sucesso!',
      });
    })
    .catch((err) => next(err));
};

updateProduct = async (req, res, next) => {
  new ProductService(req)
    .update()
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Produto atualizado!',
      });
    })
    .catch((err) => next(err));
};

blockProduct = async (req, res, next) => {
  new ProductService(req)
    .block()
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Produto bloqueado!',
      });
    })
    .catch((err) => next(err));
};

unblockProduct = async (req, res, next) => {
  new ProductService(req)
    .unblock()
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Produto desbloqueado!',
      });
    })
    .catch((err) => next(err));
};

getProductById = async (req, res, next) => {
  await new ProductService(req)
    .findProduct()
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
  await new ProductService(req)
    .findProducts()
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
