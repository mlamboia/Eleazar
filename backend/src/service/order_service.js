const Order = require('../model/order_model');
const Client = require('../model/client_model');

class OrderService {
  async create(body) {
    const order = await new Order(body);
    return await order.save();
  }

  async update(id, body) {
    const order = await Order.findOne({ _id: id });
    Object.assign(order, body);
    return await order.save();
  }

  async findOrder(id) {
    return await Order.findOne({ _id: id })
      .populate('client', 'name neighborhood adress deliverer_fee phone')
      .populate('deliverer', 'name')
      .populate('products.products', 'name unit_price')
      .exec();
  }

  async findOrders() {
    return await Order.find({})
      .populate('client', 'id name neighborhood address deliverer_fee phone')
      .populate('deliverer', 'id name')
      .populate('products.products', 'name unit_price')
      .exec();
  }
}

module.exports = new OrderService();
