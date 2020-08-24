const DelivererService = require('../service/deliverer_service');

createDeliverer = async (req, res, next) => {
  console.log(req.body);
  await DelivererService.create(req.body)
    .then(() => {
      return res.status(201).json({
        success: true,
        message: 'Entregador criado com sucesso!',
      });
    })
    .catch((err) => next(err));
};

updateDeliverer = async (req, res, next) => {
  await DelivererService.update(req.params.id, req.body)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Entregador atualizado!',
      });
    })
    .catch((err) => next(err));
};

blockDeliverer = async (req, res, next) => {
  await DelivererService.block(req.params.id)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Entregador bloqueado!',
      });
    })
    .catch((err) => next(err));
};

unblockDeliverer = async (req, res, next) => {
  await DelivererService.unblock(req.params.id)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Entregador desbloqueado!',
      });
    })
    .catch((err) => next(err));
};

getDelivererById = async (req, res, next) => {
  await DelivererService.findDeliverer(req.params.id)
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
  await DelivererService.findDeliverers()
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
