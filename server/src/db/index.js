const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
const uri = 'mongodb://127.0.0.1:27017/contact';

mongoose.connect(uri, options).catch((error) => {
  console.log('Connection error', error.message);
});

const db = mongoose.connection;

module.exports = db;
