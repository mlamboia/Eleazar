const Product = require('../model/product_model');

class ProductService {
  async create(body) {
    const product = new Product(body);
    return await product.save();
  }

  async update(id, body) {
    const product = await Product.findOne({ _id: id });
    Object.assign(product, body);
    return await product.save();
  }

  async block(id) {
    const product = await Product.findOne({ _id: id, blocked: false });
    product.blocked = true;
    return await product.save();
  }

  async unblock(id) {
    const product = await Product.findOne({ _id: id, blocked: true });
    product.blocked = false;
    return await product.save();
  }

  async findProduct(id) {
    return await Product.findOne({ _id: id });
  }

  async findProducts(id) {
    return await Product.find({ blocked: false });
  }
}

module.exports = new ProductService();
