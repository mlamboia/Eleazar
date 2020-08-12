const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    nome: {
      type: String,
      required: [true, 'É necessário um nome'],
      unique: true,
    },
    preco_unidade: {
      type: Number,
      required: [true, 'É necessário um preço'],
    },
    observacao: {
      type: String,
    },
    prato_do_dia: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('products', Product);
