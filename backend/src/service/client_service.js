const Client = require('../model/client_model');

class ClientService {
  async create(body) {
    const client = new Client(body);
    return await client.save();
  }

  async update(id, body) {
    const client = await Client.findOne({ _id: id });
    Object.assign(client, body);
    return await client.save();
  }

  async block(id) {
    const client = await Client.findOne({ _id: id, blocked: false });
    client.blocked = true;
    return await client.save();
  }

  async unblock(id) {
    const client = await Client.findOne({ _id: id, blocked: true });
    client.blocked = false;
    return await client.save();
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
