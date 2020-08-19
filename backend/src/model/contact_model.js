const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Contact = new Schema(
  {
    name: {
      type: String,
      required: [true, 'É necessário um nome'],
    },
    city: {
      type: String,
      default: 'Osasco',
    },
    neighborhood: {
      type: String,
      required: [true, 'É necessário um bairro'],
    },
    address: {
      type: String,
      required: [true, 'É necessário um endereço'],
    },
    deliverer_fee: {
      type: Number,
      required: [true, 'É necessário o valor da entrega'],
    },
    phone: {
      type: String,
      required: [true, 'É necessário um telefone'],
      unique: true,
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'orders',
      },
    ],
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('contacts', Contact);
