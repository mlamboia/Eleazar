const ClientService = require('../service/client_service');

createClient = async (req, res, next) => {
  await ClientService.create(req.body)
    .then(() => {
      return res.status(201).json({
        success: true,
        message: 'Cliente criado com sucesso!',
      });
    })
    .catch((err) => next(err));
};

updateClient = async (req, res, next) => {
  await ClientService.update(req.params.id, req.body)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Cliente atualizado!',
      });
    })
    .catch((err) => next(err));
};

blockClient = async (req, res, next) => {
  await ClientService.block(req.params.id)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Cliente bloqueado!',
      });
    })
    .catch((err) => next(err));
};

unblockClient = async (req, res, next) => {
  await ClientService.unblock(req.params.id)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Cliente desbloqueado!',
      });
    })
    .catch((err) => next(err));
};

getClientById = async (req, res, next) => {
  await ClientService.findClient(req.params.id)
    .then((client) => {
      if (client.blocked == true) {
        return res.status(404).json({
          success: false,
          error: 'Cliente bloqueado!',
        });
      }
      return res.status(200).json({
        success: true,
        data: client,
      });
    })
    .catch((err) => next(err));
};

getClients = async (req, res, next) => {
  await ClientService.findClients()
    .then((clients) => {
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
    })
    .catch((err) => next(err));
};

module.exports = {
  createClient,
  updateClient,
  getClientById,
  blockClient,
  unblockClient,
  getClients,
};
