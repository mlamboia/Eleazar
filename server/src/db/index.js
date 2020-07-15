const mongoose = require('mongoose')

mongoose
  .connect('mongodb://127.0.0.1:27017/contact', { useNewUrlParser: true})
  .catch(error => {
    console.log('Connection error', error.message)
  })

const db = mongoose.connection

module.exports = db
