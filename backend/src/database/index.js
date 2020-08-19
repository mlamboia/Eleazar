const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
const uri = process.env.MONGO_URL;

mongoose.connect(uri, options).catch((error) => {
  console.log('Connection error', error.message);
});

const db = mongoose.connection;

module.exports = db;
