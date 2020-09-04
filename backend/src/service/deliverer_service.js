const Deliverer = require('../model/deliverer_model');

class DelivererService {
  async create(body) {
    const deliverer = new Deliverer(body);
    return await deliverer.save();
  }

  async update(id, body) {
    const deliverer = await Deliverer.findOne({ _id: id });
    await Object.assign(deliverer, body);
    return await deliverer.save();
  }

  async block(id) {
    const deliverer = await Deliverer.findOne({ _id: id, blocked: false });
    deliverer.blocked = true;
    return await deliverer.save();
  }

  async unblock(id) {
    const deliverer = await Deliverer.findOne({ _id: id, blocked: true });
    deliverer.blocked = false;
    return await deliverer.save();
  }

  async findDeliverer(id) {
    return await Deliverer.findOne({ _id: id });
  }

  async findDeliverers(id) {
    return await Deliverer.find({ blocked: false });
  }
}

module.exports = new DelivererService();
