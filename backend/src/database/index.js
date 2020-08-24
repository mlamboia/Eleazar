const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
const uri = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/eleazar';

mongoose.connect(uri, options).catch((error) => {
  console.log('Connection error', error.message);
});

const db = mongoose.connection;
db.on('connected', () => console.log('🔌Mongoose is connected'));
db.on('disconnected', () => console.log('💫Mongoose is disconnected'));
db.on('error', console.error.bind(console, '💫MongoDB connection error:'));

module.exports = db;
