const Contact = require('../models/contact_model')

createContact = (req, res) => {
  const body = req.body

  if(!body){
    return res.status(400).json({
      success: false,
      error: 'Você deve fornecer um contato.',
    })
  }

  const contact = new Contact({
    nome: body.nome,
    endereço: body.endereço,
    cidade: body.cidade,
    bairro: body.bairro,
    valor_da_entrega: body.valor_da_entrega,
    telefone: body.telefone,
    celular: body.celular
  })

  if(!contact){
    return res.status(400).json({
      success: false,
      error: err
    })
  }

  contact
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: contact._id,
        message: 'Contato criado com sucesso!',
        data: contact
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Falha ao criar um contato!'
      })
    })
}

updateContact = async (req, res) => {
  const body = req.body

  if(!body){
    return res.status(400).json({
      success: false,
      error: 'Você deve fornecer um contato para atualizar.'
    })
  }

  Contact.findOne({ _id: req.params.id }), (err, contact) => {
    if(err){
      return res.status(404).json({
        err,
        message: 'Contato não encontrado!'
      })
    }
    contact.nome = body.nome
    contact.endereço = body.endereço
    contact.cidade = body.cidade
    contact.bairro = body.bairro
    contact.valor_da_entrega = body.valor_da_entrega
    contact.telefone = body.telefone
    contact.celular = body.celular

    contact
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: contact._id,
          message: 'Contato atualizado!'
        })
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Falha ao atualizar o contato!'
        })
      })
  }
}

deleteContact = async (req, res) => {
  await Contact.findOneAndDelete({ _id: req.params.id }, (err, contact) => {
    if(err){
      return res.status(400).json({
        success: false,
        error: err
      })
    }
    if(!contact){
      return res.status(404).json({
        success: false,
        error: 'Contato não encontrado'
      })
    }

    return res.status(200).json({
      success: true,
      data: contact
    })
  }).catch( err => console.log(err))
}

getContactById = async (req, res) => {
  await Contact.findOne({ _id: req.params.id }, (err, contact) => {
    if(err){
      return res.status(400).json({
        success: false,
        error: err
      })
    }

    if(!contact){
      return res.status(404).json({
        success: false,
        error: 'Contato não encontrado!'
      })
    }
    return res.status(200).json({
      success: true,
      data: contact
    })
  }).catch(err => console.log(err))
}

getContacts = async (req, res) => {
  await Contact.find({}, (err, contacts) => {
    if(err){
      return res.status(400).json({
        success: false,
        error: err
      })
    }
    if(!contacts.length){
      return res.status(404).json({
        success: false,
        error: 'Contato não encontrado!'
      })
    }
    return res.status(200).json({
      success: true,
      data: contacts
    })
  }).catch(err => console.log(err))
}

deleteAll = async (req, res) => {
  await Contact.deleteMany({nome: null}, (err, contacts) => {
    if(err){
      return res.status(400).json({
        success: false,
        error: err
      })
    } 
    return res.status(200)    .json({
      success: true,
      data: null
    })
  })
}

module.exports = {
  createContact,
  updateContact,
  deleteContact,
  getContactById,
  getContacts,
  deleteAll
}