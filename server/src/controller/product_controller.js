const Product = require('../models/product_model')

createProduct = (req, res) => {
  const body = req.body

  if(!body){
    return res.status(400).json({
      success: false,
      error: 'Você deve fornecer um Produto.',
    })
  }

  const product = new Product(body)

  if(!product){
    return res.status(400).json({
      success: false,
      error: err
    })
  }

  product
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: product._id,
        message: 'Produto criado com sucesso!'
      })
    })
    .catch(err => {
      return res.status(400).json({
        error: err,
        message: 'Falha ao criar um Produto!'
      })
    })
}

updateProduct = async (req, res) => {
  const body = req.body

  if(!body){
    return res.status(400).json({
      success: false,
      error: 'Você deve fornecer um Produto para atualizar.'
    })
  } else{
      await Product.findOne({ _id: req.params.id }, (err, product) => {
        if(err){
          return res.status(404).json({
            error: err,
            message: 'Produto não encontrado!'
          })
        }

        Object.assign(product, body)

        product
          .save()
          .then(() => {
            return res.status(200).json({
              success: true,
              id: product.nome,
              message: 'Produto atualizado!'
            })
          })
          .catch(err => {
            return res.status(404).json({
              err,
              message: 'Falha ao atualizar o Produto!'
            })
          })
      })
    }
}

deleteProduct = async (req, res) => {
  await Product.findOneAndDelete({ _id: req.params.id }, (err, product) => {
    if(err){
      return res.status(400).json({
        success: false,
        error: err
      })
    }
    if(!product){
      return res.status(404).json({
        success: false,
        error: 'Produto não encontrado.'
      })
    }

    return res.status(200).json({
      success: true,
      data: product.nome,
      message: "Produto deletado com sucesso."
    })
  }).catch( err => console.error(err))
}

getProductById = async (req, res) => {
  await Product.findOne({ _id: req.params.id }, (err, product) => {
    if(err){
      return res.status(400).json({
        success: false,
        error: err,
        message: 'Produto não encontrado!'
      })
    }

    if(!product){
      return res.status(404).json({
        success: false,
        error: 'Produto não encontrado!'
      })
    }
    return res.status(200).json({
      success: true,
      data: product
    })
  }).catch(err => console.error(err))
}

getProducts = async (req, res) => {
  await Product.find({}, (err, products) => {
    if(err){
      return res.status(400).json({
        success: false,
        error: err
      })
    }
    if(!products.length){
      return res.status(404).json({
        success: false,
        error: 'Produtos não encontrados!'
      })
    }
    return res.status(200).json({
      success: true,
      data: products
    })
  }).catch(err => console.error(err))
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProducts
}