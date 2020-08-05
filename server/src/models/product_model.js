const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema(
  {
    nome: { 
      type: String, 
      required: [true, "É necessário um nome"],
      unique: true 
    },
    preco: { 
      type: Number, 
      required: [true, "É necessário um preço"] 
    },
    quantidade: { 
      type: Number,
      default: 0
    },
    observacao: { 
      type: String
    },
    prato_do_dia: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true },
)

module.exports = mongoose.model('products', Product) 