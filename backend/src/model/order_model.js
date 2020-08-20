const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema(
  {
    client: {
      type: String,
      ref: 'clients',
      minlength: [24, 'Digite um id de contato válido!'],
      maxlength: [24, 'Digite um id de contato válido!'],
      required: [true, 'É necessário um contato!'],
    },
    deliverer: {
      type: String,
      ref: 'deliverers',
      minlength: [24, 'Digite um id de entregador válido!'],
      maxlength: [24, 'Digite um id de entregador válido!'],
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
      validate: [
        (v) => Array.isArray(v) && v.length > 0,
        'É necessário uma lista de produtos',
      ],
    },
    order_total_price: Number,
    products_total_quantity: Number,
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('orders', Order);
