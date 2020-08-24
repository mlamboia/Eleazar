require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const clientRouter = require('./route/client_router');
const delivererRouter = require('./route/deliverer_router');
const productRouter = require('./route/product_router');
const orderRouter = require('./route/order_router');
const errorHandler = require('./middleware/errorHandler');

class AppController {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.disable('x-powered-by');
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.express.use(cors());
  }

  routes() {
    this.express.use('/api', clientRouter);
    this.express.use('/api', delivererRouter);
    this.express.use('/api', productRouter);
    this.express.use('/api', orderRouter);
    this.express.use(errorHandler);
  }
}

module.exports = new AppController().express;
