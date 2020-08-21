const OrderService = require('../service/order_service');

createOrder = async (req, res, next) => {
  await new OrderService(req)
    .create()
    .then(() => {
      return res.status(201).json({
        success: true,
        message: 'Pedido criado com sucesso!',
      });
    })
    .catch((err) => next(err));
};

updateOrder = async (req, res, next) => {
  await new OrderService(req)
    .update()
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Pedido atualizado!',
      });
    })
    .catch((err) => next(err));
};

getOrderById = async (req, res, next) => {
  await new OrderService(req)
    .findOrder()
    .then((order) => {
      return res.status(200).json({
        success: true,
        data: order,
      });
    })
    .catch((err) => next(err));
};

getOrders = async (req, res, next) => {
  await new OrderService(req)
    .findOrders()
    .then((orders) => {
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
    })
    .catch((err) => next(err));
};

module.exports = {
  createOrder,
  updateOrder,
  getOrderById,
  getOrders,
};
