const Order = require('../models/order_model');
const Contact = require('../models/contact_model');
const assert = require('assert');

createOrder = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Você deve fornecer um Pedido.',
    });
  }

  const order = new Order(body);

  if (!order) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }

  order
    .save()
    .then(() => {
      findAndUpdateContactWithOrder(order._doc);

      return res.status(201).json({
        success: true,
        id: order._id,
        message: 'Pedido criado com sucesso!',
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
        message: 'Falha ao criar um Pedido!',
      });
    })
    .catch((err) => console.error(err));
};

findAndUpdateContactWithOrder = async (order) => {
  try {
    const contact = await Contact.findOne({ _id: order.contacts });
    contact.orders.push(order._id);
    contact.save();
  } catch (err) {
    console.error(err);
  }
};

updateOrder = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Você deve fornecer um Pedido para atualizar.',
    });
  }

  await Order.findOne({ _id: req.params.id }, (err, order) => {
    if (err) {
      return res.status(404).json({
        error: err,
        message: 'Pedido não encontrado!',
      });
    }

    Object.assign(order, body);

    order
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: order._id,
          message: 'Pedido atualizado!',
        });
      })
      .catch((err) => {
        return res.status(404).json({
          err,
          message: 'Falha ao atualizar o Pedido!',
        });
      });
  }).catch((err) => console.error(err));
};

deleteOrder = async (req, res) => {
  await Order.findOneAndDelete({ _id: req.params.id }, (err, order) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Pedido não encontrado.',
      });
    }

    findAndDeleteOrderFromContact(order._doc);

    return res.status(200).json({
      success: true,
      data: order._id,
      message: 'Pedido deletado com sucesso.',
    });
  });
};

findAndDeleteOrderFromContact = async (order) => {
  try {
    const contact = await Contact.findOne({ _id: order.contacts });

    contact.orders.reduce((acc, anOrder, i) => {
      if (JSON.stringify(anOrder) == JSON.stringify(order._id)) {
        delete contact.orders.splice(i, 1);
        contact.save();
      }
    });
  } catch (err) {
    console.error(err);
  }
};

getOrderById = async (req, res) => {
  await Order.findOne({ _id: req.params.id })
    .populate('contacts', 'id nome bairro endereco entrega telefone')
    .populate('deliverers', 'id nome')
    .populate('produtos.products', 'nome preco_unidade')
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err,
          message: 'Pedido não encontrado!',
        });
      }

      if (!order) {
        return res.status(404).json({
          success: false,
          error: 'Pedido não encontrado!',
        });
      }
      return res.status(200).json({
        success: true,
        data: order,
      });
    });
};

getOrders = async (req, res) => {
  await Order.find({}, (err, orders) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        error: 'Pedidos não encontrados!',
      });
    }

    return res.status(200).json({
      success: true,
      data: orders,
    });
  });
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  getOrders,
};
