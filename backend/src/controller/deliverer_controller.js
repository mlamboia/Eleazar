const Deliverer = require('../model/deliverer_model');

createDeliverer = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Você deve fornecer um entregador.',
    });
  }

  const deliverer = new Deliverer(body);

  if (!deliverer) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }

  deliverer
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: deliverer._id,
        message: 'Entregador criado com sucesso!',
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
        message: 'Falha ao criar um entregador!',
      });
    });
};

updateDeliverer = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Você deve fornecer um entregador para atualizar.',
    });
  } else {
    await Deliverer.findOne({ _id: req.params.id }, (err, deliverer) => {
      if (err) {
        return res.status(404).json({
          error: err,
          message: 'Entregador não encontrado!',
        });
      }

      Object.assign(deliverer, body);

      deliverer
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            id: deliverer._id,
            message: 'Entregador atualizado!',
          });
        })
        .catch((err) => {
          return res.status(404).json({
            err,
            message: 'Falha ao atualizar o entregador!',
          });
        });
    });
  }
};

blockDeliverer = async (req, res) => {
  await Deliverer.findOne(
    { _id: req.params.id, blocked: false },
    (err, deliverer) => {
      if (err) {
        return res.status(404).json({
          error: err,
          message: 'Entregador não encontrado!',
        });
      }

      deliverer.blocked = true;

      deliverer
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            id: deliverer._id,
            message: 'Entregador bloqueado!',
          });
        })
        .catch((err) => {
          return res.status(404).json({
            err,
            message: 'Falha ao bloquear o entregador!',
          });
        });
    }
  );
};

unblockDeliverer = async (req, res) => {
  await Deliverer.findOne(
    { _id: req.params.id, blocked: true },
    (err, deliverer) => {
      if (err) {
        return res.status(404).json({
          error: err,
          message: 'Entregador não encontrado!',
        });
      }

      deliverer.blocked = false;

      deliverer
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            id: deliverer._id,
            message: 'Entregador desbloqueado!',
          });
        })
        .catch((err) => {
          return res.status(404).json({
            err,
            message: 'Falha ao desbloquear o entregador!',
          });
        });
    }
  );
};

getDelivererById = async (req, res) => {
  await Deliverer.findOne({ _id: req.params.id }, (err, deliverer) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
        message: 'Entregador não encontrado!',
      });
    }

    if (!deliverer) {
      return res.status(404).json({
        success: false,
        error: 'Entregador não encontrado!',
      });
    }

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
  });
};

getDeliverers = async (req, res) => {
  await Deliverer.find({ blocked: false }, (err, deliverers) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
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
  });
};

module.exports = {
  createDeliverer,
  updateDeliverer,
  blockDeliverer,
  unblockDeliverer,
  getDelivererById,
  getDeliverers,
};
