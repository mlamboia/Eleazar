const Product = require('../model/product_model');

class ProductService {
  constructor(req) {
    (this.body = req.body), (this.id = req.params.id);
  }

  async create() {
    const product = new Product(body);
    await product.save();
  }

  async update() {
    await Product.findOne({ _id: this.id }, async (product) => {
      Object.assign(product, this.body);
      await product.save();
    });
  }

  async block() {
    await Product.findOne({ _id: this.id, blocked: false });
    product.blocked = true;
    await product.save();
  }

  async unblock() {
    await Product.findOne({ _id: this.id, blocked: true });
    product.blocked = false;
    await product.save();
  }

  async findProduct() {
    return await Product.findOne({ _id: this.id });
  }

  async findProducts() {
    return await Product.find({ blocked: false });
  }
}

module.exports = ProductService;
