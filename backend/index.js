const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const db = require('./src/database/index');
const contactRouter = require('./src/route/contact_router');
const delivererRouter = require('./src/route/deliverer_router');
const productRouter = require('./src/route/product_router');
const orderRouter = require('./src/route/order_router');

const app = express();
app.disable('x-powered-by');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', contactRouter);
app.use('/api', delivererRouter);
app.use('/api', productRouter);
app.use('/api', orderRouter);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(PORT, console.log(`Server running on port ${PORT}`));
