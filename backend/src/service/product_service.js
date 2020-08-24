const Product = require('../model/product_model');

class ProductService {
  async create(body) {
    const product = new Product(body);
    await product.save();
  }

  async update(id, body) {
    await Product.findOne({ _id: id }, async (product) => {
      Object.assign(product, body);
      await product.save();
    });
  }

  async block(id) {
    await Product.findOne({ _id: id, blocked: false });
    product.blocked = true;
    await product.save();
  }

  async unblock(id) {
    await Product.findOne({ _id: id, blocked: true });
    product.blocked = false;
    await product.save();
  }

  async findProduct(id) {
    return await Product.findOne({ _id: id });
  }

  async findProducts(id) {
    return await Product.find({ blocked: false });
  }
}

module.exports = new ProductService();
