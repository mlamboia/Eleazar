const Client = require('../model/client_model');

class ClientService {
  async create(body) {
    const client = new Client(body);
    return await client.save();
  }

  async update(id, body) {
    await Client.findOne({ _id: id }, async (client) => {
      Object.assign(client, body);
      return await client.save();
    });
  }

  async block(id) {
    await Client.findOne({ _id: id, blocked: false }, (client) => {
      client.blocked = true;
      return client.save();
    });
  }

  async unblock(id) {
    await Client.findOne({ _id: id, blocked: true }, (client) => {
      client.blocked = false;
      return client.save();
    });
  }

  async findClient(id) {
    return await Client.findOne({ _id: id })
      .populate({
        path: 'orders',
        select: 'deliverer products products_total_quantity order_total_price',
        populate: { path: 'deliverer', select: 'name' },
      })
      .exec();
  }

  async findClients() {
    return await Client.find({ blocked: false })
      .populate({
        path: 'orders',
        select: 'deliverer products products_total_quantity order_total_price',
        populate: { path: 'deliverer', select: 'name' },
      })
      .exec();
  }
}

module.exports = new ClientService();
