const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema(
  {
    deliverers:{
      type: Schema.Types.ObjectId, ref: 'deliverers',
      required: [true, "É necessário um entregador"]
    },
    products: [{ 
      type: Schema.Types.ObjectId, ref: 'products',
      required: [true, "É necessário um produto!"]
    }],
    total: { 
      type: Number
    }
  },
  { timestamps: true },
)

module.exports = mongoose.model('orders', Order) 