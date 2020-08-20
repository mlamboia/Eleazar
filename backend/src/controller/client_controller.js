const Client = require('../model/client_model');

createClient = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Você deve fornecer um cliente.',
    });
  }

  const client = new Client(body);

  if (!client) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }

  client
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: client._id,
        message: 'Cliente criado com sucesso!',
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
        message: 'Falha ao criar um cliente!',
      });
    });
};

updateClient = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Você deve fornecer um cliente para atualizar.',
    });
  } else {
    await Client.findOne({ _id: req.params.id }, (err, client) => {
      if (err) {
        return res.status(404).json({
          error: err,
          message: 'Cliente não encontrado!',
        });
      }

      Object.assign(client, body);

      client
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            id: client._id,
            message: 'Cliente atualizado!',
          });
        })
        .catch((err) => {
          return res.status(404).json({
            err,
            message: 'Falha ao atualizar o cliente!',
          });
        });
    });
  }
};

blockClient = async (req, res) => {
  await Client.findOne(
    { _id: req.params.id, blocked: false },
    (err, client) => {
      if (err) {
        return res.status(404).json({
          error: err,
          message: 'Cliente não encontrado!',
        });
      }

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
        .catch((err) => {
          return res.status(404).json({
            err,
            message: 'Falha ao bloquear o cliente!',
          });
        });
    }
  );
};

unblockClient = async (req, res) => {
  await Client.findOne({ _id: req.params.id, blocked: true }, (err, client) => {
    if (err) {
      return res.status(404).json({
        error: err,
        message: 'Cliente não encontrado!',
      });
    }

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
      .catch((err) => {
        return res.status(404).json({
          err,
          message: 'Falha ao desbloquear o cliente!',
        });
      });
  });
};

getClientById = async (req, res) => {
  await Client.findOne({ _id: req.params.id })
    .populate({
      path: 'orders',
      select: 'products deliverers',
      populate: { path: 'deliverers', select: 'name' },
      populate: { path: 'products.products', select: 'name' },
    })
    .exec((err, client) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err,
          message: 'Cliente não encontrado!',
        });
      }

      if (!client) {
        return res.status(404).json({
          success: false,
          error: 'Cliente não encontrado!',
        });
      }

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
};

getClients = async (req, res) => {
  await Client.find({ blocked: false })
    .populate({
      path: 'orders',
      select: 'products deliverers',
      populate: { path: 'deliverers', select: 'name' },
      populate: { path: 'products.products', select: 'name' },
    })
    .exec((err, clients) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err,
        });
      }
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
};

module.exports = {
  createClient,
  updateClient,
  getClientById,
  blockClient,
  unblockClient,
  getClients,
};
