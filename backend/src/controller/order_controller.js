const OrderService = require('../service/order_service');

createOrder = async (req, res, next) => {
  await OrderService.create(req.body)
    .then(() => {
      return res.status(201).json({
        success: true,
        message: 'Pedido criado com sucesso!',
      });
    })
    .catch((err) => next(err));
};

updateOrder = async (req, res, next) => {
  await OrderService.update(req.params.id, req.body)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Pedido atualizado!',
      });
    })
    .catch((err) => next(err));
};

getOrderById = async (req, res, next) => {
  await OrderService.findOrder(req.params.id)
    .then((order) => {
      return res.status(200).json({
        success: true,
        data: order,
      });
    })
    .catch((err) => next(err));
};

getOrders = async (req, res, next) => {
  await OrderService.findOrders()
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
