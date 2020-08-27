const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { maxLength, minLength } = require('../helper/custom_validators');

const Product = new Schema(
  {
    name: {
      type: String,
      required: [true, 'É necessário o nome do produto!'],
      validate: [
        minLength(4, 'O nome do produto deve possuir mais de 4 caracteres!'),
        maxLength(50, 'O nome do produto deve possuir menos de 50 caracteres!'),
      ],
      unique: true,
    },
    unit_price: {
      type: Number,
      required: [true, 'É necessário o preço do produto!'],
      min: [1, 'O preço minimo de um produto não pode ser menor que R$1,00!'],
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
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('products', Product);
