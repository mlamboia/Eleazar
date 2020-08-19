const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Deliverer = new Schema(
  {
    name: {
      type: String,
      required: [true, 'É necessário um nome'],
    },
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('deliverers', Deliverer);
