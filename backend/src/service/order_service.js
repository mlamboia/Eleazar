const Order = require('../model/order_model');
const Client = require('../model/client_model');

class OrderService {
  async create(body) {
    const order = await new Order(body);
    await this.addOrderTotalQuantity(order._doc);
    await this.addOrderTotalPrice(order);
    await this.addOrderProductsTotalPrice(order);
    await order.save();
    await this.findAndUpdateClientWithOrder(order);
    return order;
  }

  async addOrderTotalPrice(order) {
    try {
      const totalPrice = await order.products.reduce((acc, cur) => {
        return acc + cur.unit_price * cur.quantity;
      }, 0);
      order.order_total_price = await totalPrice;
    } catch (e) {
      console.error(e);
    }
  }

  async addOrderTotalQuantity(order) {
    try {
      const totalQuantity = await order.products.reduce((acc, cur) => {
        return acc + cur.quantity;
      }, 0);
      order.products_total_quantity = await totalQuantity;
    } catch (e) {
      console.error(e);
    }
  }

  async addOrderProductsTotalPrice(order) {
    try {
      await order.products.reduce(async (acc, cur) => {
        const productsTotalPrice = (await cur.unit_price) * cur.quantity;
        cur.products_total_price = await productsTotalPrice;
      }, 0);
    } catch (e) {
      console.error(e);
    }
  }

  async findAndUpdateClientWithOrder(order) {
    try {
      const client = await Client.findOne({ _id: order.client });
      await client.orders.push(order._id);
      await client.save();
    } catch (e) {
      console.error(e);
    }
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
