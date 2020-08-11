const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Deliverer = new Schema(
  {
    nome: {
      type: String,
      required: [true, 'É necessário um nome'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('deliverers', Deliverer);
