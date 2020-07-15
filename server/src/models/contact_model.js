const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Contact = new Schema(
  {
    nome: { type: String, required: true },
    endereço: { type: String, required: true },
    cidade: { type: String, required: true },
    bairro: { type: String, required: true },
    entrega: { type: Number, required: true },
    telefone: { type: String, required: true },
    celular: { type: String, required: false }
  },
  { timestamps: true },
)

module.exports = mongoose.model('contacts', Contact) 