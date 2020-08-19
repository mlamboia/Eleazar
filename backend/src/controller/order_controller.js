const Order = require('../model/order_model');
const Contact = require('../model/contact_model');

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
      await findAndUpdateContactWithOrder(order._doc);

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

findAndUpdateContactWithOrder = async (order) => {
  try {
    const contact = await Contact.findOne({ _id: order.contact });
    contact.orders.push(order._id);
    contact.save();
  } catch (err) {
    console.error(err);
  }
};

addOrderTotalPrice = async (res, order) => {
  try {
    await order.populate('products.products', 'name unit_price').execPopulate();

    const totalPrice = order.products.reduce((acc, cur) => {
      return acc + cur.products.unit_price * cur.quantity;
    }, 0);

    // if (totalPrice <= 0) throw new Error();

    order.total_price = totalPrice;
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

    // if (totalQuantity <= 0) throw new Error();

    order.products_total_quantity = totalQuantity;
  } catch (err) {
    return res.status(400).json({
      error: err,
      message: 'Falha ao criar um Pedido!',
    });
  }
};

addOrderProductsTotalPrice = async (res, order) => {
  try {
    await order.populate('products.products', 'name unit_price').execPopulate();

    order.products.reduce((acc, cur) => {
      const productsTotalPrice = cur.products.unit_price * cur.quantity;

      // if (productsTotalPrice <= 0) throw new Error();

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
    .populate('contact', 'name neighborhood adress deliverer_fee phone')
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
    .populate('contact', 'id name neighborhood address deliverer_fee phone')
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
