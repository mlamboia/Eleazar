const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: {
      type: String,
      required: [true, 'É necessário um nome'],
      unique: true,
    },
    unit_price: {
      type: Number,
      required: [true, 'É necessário um preço'],
    },
    observation: {
      type: String,
    },
    dish_day: {
      type: Boolean,
      default: false,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('products', Product);
