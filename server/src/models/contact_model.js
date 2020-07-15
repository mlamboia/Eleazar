const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Contact = new Schema(
  {
    nome: String,
    endereço: String,
    cidade: String,
    bairro: String,
    entrega: Number,
    telefone: String,
    celular: String
  },
  { timestamps: true },
)

module.exports = mongoose.model('contacts', Contact) 


// {
//   "nome": "String",
//   "endereço": "String",
//   "cidade": "String",
//   "bairro": "String",
//   "entrega": 123456,
//   "telefone": "String",
//   "celular": "String"
// }