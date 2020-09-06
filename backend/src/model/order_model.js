const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { valueIsArray } = require('../helper/custom_validators');
const Client = require('./client_model');

const Order = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'clients',
      required: [true, 'É necessário um cliente!'],
    },
    deliverer: {
      type: Schema.Types.ObjectId,
      ref: 'deliverers',
      required: [true, 'É necessário um entregador!'],
    },
    products: {
      type: [
        {
          quantity: { type: Number, default: 1 },
          product_name: String,
          unit_price: Number,
          products_total_price: Number,
          _id: false,
        },
      ],
      validate: valueIsArray('É necessário uma lista de produtos'),
    },
    order_total_price: Number,
    products_total_quantity: Number,
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

Order.pre('save', async function (next) {
  const totalPrice = this.products.reduce((acc, cur) => {
    return acc + cur.unit_price * cur.quantity;
  }, 0);

  this.order_total_price = await totalPrice;
  next();
});

Order.pre('save', async function (next) {
  const totalQuantity = this.products.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);
  this.products_total_quantity = await totalQuantity;
  next();
});

Order.pre('save', async function (next) {
  await this.products.reduce(async (acc, cur) => {
    const productsTotalPrice = cur.unit_price * cur.quantity;
    cur.products_total_price = await productsTotalPrice;
  }, 0);
  next();
});

Order.pre('save', async function (next) {
  const client = await Client.findOne({ _id: this.client });
  await client.orders.push(this._id);

  await client.save();
  return next();
});

module.exports = mongoose.model('orders', Order);
