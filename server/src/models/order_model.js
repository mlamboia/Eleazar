const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema(
  {
    contacts:{
      type: Schema.Types.ObjectId, ref: 'contacts',
      required: [true, "É necessário um contato"]
    },
    deliverers:{
      type: Schema.Types.ObjectId, ref: 'deliverers',
      required: [true, "É necessário um entregador"]
    },
    products: [{ 
      type: String,
      required: [true, "É necessário um produto!"]
    }],
    total: { 
      type: Number
    }
  },
  { timestamps: true },
)

module.exports = mongoose.model('orders', Order) 