const ClientService = require('../service/service_controller');
const Client = require('../model/client_model');

createClient = (req, res, next) => {
  new ClientService()
    .create(req)
    .then(() => {
      return res.status(201).json({
        success: true,
        message: 'Cliente criado com sucesso!',
      });
    })
    .catch((err) => next(err));
};

updateClient = async (req, res, next) => {
  new ClientService()
    .upgrade(req)
    .then((err) => {
      return res.status(200).json({
        success: true,
        message: 'Cliente atualizado!',
      });
    })
    .catch((err) => next(err));
};

blockClient = async (req, res, next) => {
  try {
    await Client.findOne(
      { _id: req.params.id, blocked: false },
      (err, client) => {
        client.blocked = true;

        client
          .save()
          .then(() => {
            return res.status(200).json({
              success: true,
              id: client._id,
              message: 'Cliente bloqueado!',
            });
          })
          .catch((err) => next(err));
      }
    );
  } catch (err) {
    next(err);
  }
};

unblockClient = async (req, res, next) => {
  try {
    await Client.findOne(
      { _id: req.params.id, blocked: true },
      (err, client) => {
        client.blocked = false;

        client
          .save()
          .then(() => {
            return res.status(200).json({
              success: true,
              id: client._id,
              message: 'Cliente desbloqueado!',
            });
          })
          .catch((err) => next(err));
      }
    );
  } catch (err) {
    next(err);
  }
};

getClientById = async (req, res, next) => {
  try {
    await Client.findOne({ _id: req.params.id })
      .populate({
        path: 'orders',
        select: 'deliverer products products_total_quantity order_total_price',
        populate: { path: 'deliverer', select: 'name' },
      })
      .exec((err, client) => {
        if (err) next(err);

        if (deliverer.blocked == true) {
          return res.status(404).json({
            success: false,
            error: 'Cliente bloqueado!',
          });
        }
        return res.status(200).json({
          success: true,
          data: client,
        });
      });
  } catch (err) {
    next(err);
  }
};

getClients = async (req, res, next) => {
  try {
    await Client.find({ blocked: false })
      .populate({
        path: 'orders',
        select: 'deliverer products products_total_quantity order_total_price',
        populate: { path: 'deliverer', select: 'name' },
      })
      .exec((err, clients) => {
        if (err) next(err);

        if (!clients.length) {
          return res.status(404).json({
            success: false,
            error: 'Clientes não encontrados!',
          });
        }

        return res.status(200).json({
          success: true,
          data: clients,
        });
      });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createClient,
  updateClient,
  getClientById,
  blockClient,
  unblockClient,
  getClients,
};
