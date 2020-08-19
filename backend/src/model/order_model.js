const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema(
  {
    contact: {
      type: Schema.Types.ObjectId,
      ref: 'contacts',
      required: [true, 'É necessário um contato'],
    },
    deliverer: {
      type: Schema.Types.ObjectId,
      ref: 'deliverers',
      required: [true, 'É necessário um entregador'],
    },
    products: {
      type: [
        {
          quantity: {
            type: { Number, min: 1 },
            default: 1,
          },
          product: {
            type: Schema.Types.ObjectId,
            ref: 'products',
            required: [true, 'É necessário um produtos'],
          },
          price: {
            type: Number,
            required: [true, 'É necessário um produtos'],
          },
          products_total_price: {
            type: Number,
            required: [true, 'É necessário um produtos'],
          },
        },
      ],
      required: [true, 'É necessário um produtos'],
    },
    total_price: { type: Number, required: true },
    products_total_quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('orders', Order);
