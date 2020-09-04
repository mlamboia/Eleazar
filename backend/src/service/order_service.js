const Order = require('../model/order_model');
const Client = require('../model/client_model');

class OrderService {
  async create(body) {
    const order = await new Order(body);
    await this.addOrderTotalQuantity(order._doc);
    await this.addOrderTotalPrice(order);
    await this.addOrderProductsTotalPrice(order);
    await order.save();
    await this.findAndUpdateClientWithOrder(order._doc);
    return order;
  }

  async addOrderTotalPrice(order) {
    const totalPrice = await order.products.reduce((acc, cur) => {
      return acc + cur.unit_price * cur.quantity;
    }, 0);
    order.order_total_price = totalPrice;
  }

  async addOrderTotalQuantity(order) {
    const totalQuantity = await order.products.reduce((acc, cur) => {
      return acc + cur.quantity;
    }, 0);
    order.products_total_quantity = totalQuantity;
  }

  async addOrderProductsTotalPrice(order) {
    await order.products.reduce(async (acc, cur) => {
      const productsTotalPrice = (await cur.unit_price) * cur.quantity;
      cur.products_total_price = productsTotalPrice;
    }, 0);
  }

  async findAndUpdateClientWithOrder(order) {
    const client = await Client.findOne({ _id: order.client });
    client.orders.push(order._id);
    await client.save();
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

  async findOrders(id) {
    return await Order.find({})
      .populate('client', 'id name neighborhood address deliverer_fee phone')
      .populate('deliverer', 'id name')
      .populate('products.products', 'name unit_price')
      .exec();
  }
}

module.exports = new OrderService();
