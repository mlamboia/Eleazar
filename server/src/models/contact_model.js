const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Contact = new Schema(
  {
    nome: { 
      type: String, 
      required: [true, "É necessário um nome"] 
    },
    cidade: { 
      type: String, 
      default: "Osasco" 
    },
    bairro: { 
      type: String, 
      required: [true, "É necessário um bairro"] 
    },
    endereco: { 
      type: String, 
      required: [true, "É necessário um endereço"] 
    },
    entrega: { 
      type: Number, 
      required: [true, "É necessário o valor da entrega"] 
    },
    telefone: { 
      type: String, 
      required: [true, "É necessário um telefone"], 
      unique: true 
    },
    orders: {
      type: Schema.Types.ObjectId, ref: 'orders'
    }
  },
  { timestamps: true },
)

module.exports = mongoose.model('contacts', Contact) 