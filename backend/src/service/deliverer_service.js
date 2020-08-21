class DelivererService {
  constructor(req) {
    (this.body = req.body), (this.id = req.params.id);
  }

  async create() {
    const deliverer = new Deliverer(this.body);
    await deliverer.save();
  }

  async update() {
    await Deliverer.findOne({ _id: this.id }, async (deliverer) => {
      await Object.assign(deliverer, this.body);
      deliverer.save();
    });
  }

  async block() {
    await Deliverer.findOne({ _id: this.id, blocked: false }, (deliverer) => {
      deliverer.blocked = true;
      deliverer.save();
    });
  }

  async unblock() {
    await Deliverer.findOne({ _id: this.id, blocked: true }, (deliverer) => {
      deliverer.blocked = false;
      deliverer.save();
    });
  }

  async findDeliverer() {
    return await Deliverer.findOne({ _id: this.id });
  }

  async findDeliverers() {
    return await Deliverer.find({ blocked: false });
  }
}
