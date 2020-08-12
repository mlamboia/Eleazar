const Deliverer = require('../models/deliverer_model');

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
            id: deliverer.nome,
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

deleteDeliverer = async (req, res) => {
  await Deliverer.findOneAndDelete({ _id: req.params.id }, (err, deliverer) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!deliverer) {
      return res.status(404).json({
        success: false,
        error: 'Entregador não encontrado.',
      });
    }

    return res.status(200).json({
      success: true,
      data: deliverer.nome,
      message: 'Entregador deletado com sucesso.',
    });
  });
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
    return res.status(200).json({
      success: true,
      data: deliverer,
    });
  });
};

getDeliverers = async (req, res) => {
  await Deliverer.find({}, (err, deliverers) => {
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
  deleteDeliverer,
  getDelivererById,
  getDeliverers,
};
