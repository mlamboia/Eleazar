const mongoose = require('mongoose');

const connect = async () => {
  if (mongoose.connection.readyState === 0) {
    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
    const uri =
      process.env.NODE_ENV === 'test'
        ? process.env.TEST_MONGO_URL
        : process.env.MONGO_URL;

    await mongoose.connect(uri, options).catch((error) => {
      console.log('Connection error', error.message);
    });
  }
};

const truncate = async () => {
  if (mongoose.connection.readyState !== 0) {
    const { collections } = mongoose.connection;

    const promises = Object.keys(collections).map((collection) =>
      mongoose.connection.collection(collection).deleteMany({})
    );

    await Promise.all(promises);
  }
};

const disconnect = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};

const handleLogs = () => {
  const db = mongoose.connection;

  db.on('connected', () => console.log('🔌Mongoose is connected'));
  db.on('disconnected', () => console.log('💫Mongoose is disconnected'));
  db.on('error', console.error.bind(console, '💫MongoDB connection error:'));
};

module.exports = {
  connect,
  truncate,
  disconnect,
  handleLogs,
};
