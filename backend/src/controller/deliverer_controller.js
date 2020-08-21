const DelivererService = require('../service/deliverer_service');

createDeliverer = async (req, res, next) => {
  await new DelivererService(req)
    .create()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: deliverer._id,
        message: 'Entregador criado com sucesso!',
      });
    })
    .catch((err) => next(err));
};

updateDeliverer = async (req, res, next) => {
  await new DelivererService(req)
    .update()
    .then(() => {
      return res.status(200).json({
        success: true,
        id: deliverer._id,
        message: 'Entregador atualizado!',
      });
    })
    .catch((err) => next(err));
};

blockDeliverer = async (req, res, next) => {
  await new DelivererService(req)
    .block()
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Entregador bloqueado!',
      });
    })
    .catch((err) => next(err));
};

unblockDeliverer = async (req, res, next) => {
  await new DelivererService(req)
    .unblock()
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Entregador desbloqueado!',
      });
    })
    .catch((err) => next(err));
};

getDelivererById = async (req, res, next) => {
  await new DelivererService(req)
    .findDeliverer()
    .then((deliverer) => {
      if (deliverer.blocked == true) {
        return res.status(404).json({
          success: false,
          error: 'Entregador bloqueado!',
        });
      }
      return res.status(200).json({
        success: true,
        data: deliverer,
      });
    })
    .catch((err) => next(err));
};

getDeliverers = async (req, res, next) => {
  await new DelivererService(req)
    .findDeliverers()
    .then((deliverers) => {
      if (!deliverers.length) {
        return res.status(404).json({
          success: false,
          error: 'Entregadores não encontrados!',
        });
      }
      return res.status(200).json({
        success: true,
        data: deliverers,
      });
    })
    .catch((err) => next(err));
};

module.exports = {
  createDeliverer,
  updateDeliverer,
  blockDeliverer,
  unblockDeliverer,
  getDelivererById,
  getDeliverers,
};
