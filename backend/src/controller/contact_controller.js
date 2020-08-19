const Contact = require('../model/contact_model');

createContact = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Você deve fornecer um contato.',
    });
  }

  const contact = new Contact(body);

  if (!contact) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }

  contact
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: contact._id,
        message: 'Contato criado com sucesso!',
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
        message: 'Falha ao criar um contato!',
      });
    });
};

updateContact = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Você deve fornecer um contato para atualizar.',
    });
  } else {
    await Contact.findOne({ _id: req.params.id }, (err, contact) => {
      if (err) {
        return res.status(404).json({
          error: err,
          message: 'Contato não encontrado!',
        });
      }

      Object.assign(contact, body);

      contact
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            id: contact._id,
            message: 'Contato atualizado!',
          });
        })
        .catch((err) => {
          return res.status(404).json({
            err,
            message: 'Falha ao atualizar o contato!',
          });
        });
    });
  }
};

blockContact = async (req, res) => {
  await Contact.findOne(
    { _id: req.params.id, blocked: false },
    (err, contact) => {
      if (err) {
        return res.status(404).json({
          error: err,
          message: 'Contato não encontrado!',
        });
      }

      contact.blocked = true;

      contact
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            id: contact._id,
            message: 'Contato bloqueado!',
          });
        })
        .catch((err) => {
          return res.status(404).json({
            err,
            message: 'Falha ao bloquear o contato!',
          });
        });
    }
  );
};

unblockContact = async (req, res) => {
  await Contact.findOne(
    { _id: req.params.id, blocked: true },
    (err, contact) => {
      if (err) {
        return res.status(404).json({
          error: err,
          message: 'Contato não encontrado!',
        });
      }

      contact.blocked = false;

      contact
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            id: contact._id,
            message: 'Contato desbloqueado!',
          });
        })
        .catch((err) => {
          return res.status(404).json({
            err,
            message: 'Falha ao desbloquear o contato!',
          });
        });
    }
  );
};

getContactById = async (req, res) => {
  await Contact.findOne({ _id: req.params.id })
    .populate({
      path: 'orders',
      select: 'products deliverers',
      populate: { path: 'deliverers', select: 'name' },
      populate: { path: 'products.products', select: 'name' },
    })
    .exec((err, contact) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err,
          message: 'Contato não encontrado!',
        });
      }

      if (!contact) {
        return res.status(404).json({
          success: false,
          error: 'Contato não encontrado!',
        });
      }

      if (deliverer.blocked == true) {
        return res.status(404).json({
          success: false,
          error: 'Contato bloqueado!',
        });
      }

      return res.status(200).json({
        success: true,
        data: contact,
      });
    });
};

getContacts = async (req, res) => {
  await Contact.find({ blocked: false })
    .populate({
      path: 'orders',
      select: 'products deliverers',
      populate: { path: 'deliverers', select: 'name' },
      populate: { path: 'products.products', select: 'name' },
    })
    .exec((err, contacts) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err,
        });
      }
      if (!contacts.length) {
        return res.status(404).json({
          success: false,
          error: 'Contatos não encontrados!',
        });
      }
      return res.status(200).json({
        success: true,
        data: contacts,
      });
    });
};

module.exports = {
  createContact,
  updateContact,
  getContactById,
  blockContact,
  unblockContact,
  getContacts,
};
