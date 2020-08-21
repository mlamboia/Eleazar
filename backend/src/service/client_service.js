const Client = require('../model/client_model');

class ClientService {
  constructor(req) {
    (this.body = req.body), (this.id = req.params.id);
  }

  async create() {
    const client = new Client(this.body);
    await client.save();
  }

  async update() {
    await Client.findOne({ _id: this.id }, async (client) => {
      Object.assign(client, this.body);
      await client.save();
    });
  }

  async block() {
    await Client.findOne({ _id: this.id, blocked: false }, (client) => {
      client.blocked = true;
      client.save();
    });
  }

  async unblock() {
    await Client.findOne({ _id: this.id, blocked: true }, (client) => {
      console.log(client);
      client.blocked = false;
      client.save();
    });
  }

  async findClient() {
    return await Client.findOne({ _id: this.id })
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

module.exports = ClientService;
