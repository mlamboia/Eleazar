const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isLength, valueIsArray } = require('../helper/custom_validators');

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

module.exports = mongoose.model('orders', Order);
