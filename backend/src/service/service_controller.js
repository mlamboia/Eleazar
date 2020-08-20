const Client = require('../model/client_model');

class ClientService {
  async create(req) {
    const client = new Client(req.body);
    await client.save();
  }
  async upgrade(req) {
    await Client.findOne({ _id: req.params.id }, async (err, client) => {
      Object.assign(client, req.body);
      await client.save();
    });
  }
}

module.exports = ClientService;
