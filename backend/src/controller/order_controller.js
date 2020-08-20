const Order = require('../model/order_model');
const Client = require('../model/client_model');

createOrder = async (req, res) => {
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

  await addOrderTotalQuantity(res, order._doc);
  await addOrderTotalPrice(res, order);
  await addOrderProductsTotalPrice(res, order);

  order
    .save()
    .then(async () => {
      await findAndUpdateClientWithOrder(res, order._doc);

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
    });
};

findAndUpdateClientWithOrder = async (res, order) => {
  try {
    const client = await Client.findOne({ _id: order.client });
    client.orders.push(order._id);

    client.save();
  } catch (err) {
    return res.status(400).json({
      error: err,
      message: 'Falha ao criar um Pedido!',
    });
  }
};

addOrderTotalPrice = (res, order) => {
  try {
    const totalPrice = order.products.reduce((acc, cur) => {
      return acc + cur.unit_price * cur.quantity;
    }, 0);

    order.order_total_price = totalPrice;
  } catch (err) {
    return res.status(400).json({
      error: err,
      message: 'Falha ao criar um Pedido!',
    });
  }
};

addOrderTotalQuantity = (res, order) => {
  try {
    const totalQuantity = order.products.reduce((acc, cur) => {
      return acc + cur.quantity;
    }, 0);

    order.products_total_quantity = totalQuantity;
  } catch (err) {
    return res.status(400).json({
      error: err,
      message: 'Falha ao criar um Pedido!',
    });
  }
};

addOrderProductsTotalPrice = (res, order) => {
  try {
    order.products.reduce(async (acc, cur) => {
      const productsTotalPrice = (await cur.unit_price) * cur.quantity;

      cur.products_total_price = productsTotalPrice;
    }, 0);
  } catch (err) {
    return res.status(400).json({
      error: err,
      message: 'Falha ao criar um Pedido!',
    });
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
  });
};

getOrderById = async (req, res) => {
  await Order.findOne({ _id: req.params.id })
    .populate('client', 'name neighborhood adress deliverer_fee phone')
    .populate('deliverer', 'name')
    .populate('products.products', 'name unit_price')
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
  await Order.find({})
    .populate('client', 'id name neighborhood address deliverer_fee phone')
    .populate('deliverer', 'id name')
    .populate('products.products', 'name unit_price')
    .exec((err, orders) => {
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
  getOrderById,
  getOrders,
};
