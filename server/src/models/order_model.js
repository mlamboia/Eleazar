const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema(
  {
    contacts: {
      type: Schema.Types.ObjectId,
      ref: 'contacts',
      required: [true, 'É necessário um contato'],
    },
    deliverers: {
      type: Schema.Types.ObjectId,
      ref: 'deliverers',
      required: [true, 'É necessário um entregador'],
    },
    produtos: [
      {
        quantidade: {
          type: { Number, min: 1 },
          default: 1,
        },
        products: {
          type: Schema.Types.ObjectId,
          ref: 'products',
          required: [true, 'É necessário um produtos'],
        },
        preco: {
          type: Number,
        },
      },
    ],
    preco_total: Number,
    quantidade_total_produtos: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model('orders', Order);
