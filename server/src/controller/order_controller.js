const Order = require('../models/order_model')

createOrder = (req, res) => {
  const body = req.body

  if(!body){
    return res.status(400).json({
      success: false,
      error: 'Você deve fornecer um Pedido.',
    })
  }

  const order = new Order(body)

  if(!order){
    return res.status(400).json({
      success: false,
      error: err
    })
  }

  order
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: order._id,
        message: 'Pedido criado com sucesso!'
      })
    })
    .catch(err => {
      return res.status(400).json({
        error: err,
        message: 'Falha ao criar um Pedido!'
      })
    })
}

updateOrder = async (req, res) => {
  const body = req.body

  if(!body){
    return res.status(400).json({
      success: false,
      error: 'Você deve fornecer um Pedido para atualizar.'
    })
  } else{
      await Order.findOne({ _id: req.params.id }, (err, order) => {
        if(err){
          return res.status(404).json({
            error: err,
            message: 'Pedido não encontrado!'
          })
        }

        Object.assign(order, body)

        order
          .save()
          .then(() => {
            return res.status(200).json({
              success: true,
              id: order.nome,
              message: 'Pedido atualizado!'
            })
          })
          .catch(err => {
            return res.status(404).json({
              err,
              message: 'Falha ao atualizar o Pedido!'
            })
          })
      })
    }
}

deleteOrder = async (req, res) => {
  await Order.findOneAndDelete({ _id: req.params.id })
  .populate('contacts')
  .populate('deliverers')
  .exec((err, order) => {
    if(err){
      return res.status(400).json({
        success: false,
        error: err
      })
    }
    if(!order){
      return res.status(404).json({
        success: false,
        error: 'Pedido não encontrado.'
      })
    }

    return res.status(200).json({
      success: true,
      data: order.nome,
      message: "Pedido deletado com sucesso."
    })
  }).catch( err => console.error(err))
}

getOrderById = async (req, res) => {
  await Order.findOne({ _id: req.params.id })
  .populate('contacts')
  .populate('deliverers')
  .exec((err, order) => {
    if(err){
      return res.status(400).json({
        success: false,
        error: err,
        message: 'Pedido não encontrado!'
      })
    }

    if(!order){
      return res.status(404).json({
        success: false,
        error: 'Pedido não encontrado!'
      })
    }
    return res.status(200).json({
      success: true,
      data: order
    })
  }).catch(err => console.error(err))
}

getOrders = async (req, res) => {
  await Order.find({})
  .populate('contacts')
  .populate('deliverers')
  .exec((err, orders) => {
    if(err){
      return res.status(400).json({
        success: false,
        error: err
      })
    }

    if(!orders.length){
      return res.status(404).json({
        success: false,
        error: 'Pedidos não encontrados!'
      })
    }

    return res.status(200).json({
      success: true,
      data: orders
    })
  }).catch(err => console.error(err))
}

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  getOrders
}