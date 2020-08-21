const Order = require('../model/order_model');
const Client = require('../model/client_model');

class OrderService {
  constructor(req, res) {
    (this.req = req), (this.body = req.body), (this.id = req.params.id);
  }

  async create() {
    const order = new Order(this.body);
    await addOrderTotalQuantity(order._doc);
    await addOrderTotalPrice(order);
    await addOrderProductsTotalPrice(order);
    await order.save();
    await findAndUpdateClientWithOrder(order._doc);
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

  async findAndUpdateClientWithOrder(res, order) {
    const client = await Client.findOne({ _id: order.client });
    client.orders.push(order._id);
    await client.save();
  }

  async update() {
    await Order.findOne({ _id: this.id }, async (order) => {
      Object.assign(order, this.body);
      await order.save();
    });
  }

  async findOrder() {
    return await Order.findOne({ _id: req.params.id })
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

module.exports = OrderService;
