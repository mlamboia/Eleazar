const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Deliverer = new Schema(
  {
    name: {
      type: String,
      minlength: [4, 'O nome do entregador deve possuir mais de 4 caracteres!'],
      maxlength: [
        50,
        'O nome do entregador deve possuir menos de 50 caracteres!',
      ],
    },
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('deliverers', Deliverer);
