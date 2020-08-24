const Deliverer = require('../model/deliverer_model');

class DelivererService {
  async create(body) {
    const deliverer = new Deliverer(body);
    await deliverer.save();
  }

  async update(id, body) {
    await Deliverer.findOne({ _id: id }, async (deliverer) => {
      await Object.assign(deliverer, body);
      deliverer.save();
    });
  }

  async block(id) {
    await Deliverer.findOne({ _id: id, blocked: false }, (deliverer) => {
      deliverer.blocked = true;
      deliverer.save();
    });
  }

  async unblock(id) {
    await Deliverer.findOne({ _id: id, blocked: true }, (deliverer) => {
      deliverer.blocked = false;
      deliverer.save();
    });
  }

  async findDeliverer(id) {
    return await Deliverer.findOne({ _id: id });
  }

  async findDeliverers(id) {
    return await Deliverer.find({ blocked: false });
  }
}

module.exports = new DelivererService();
