const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const db = require('./src/db/index');
const contactRouter = require('./src/routes/contact_router');
const delivererRouter = require('./src/routes/deliverer_router');
const productRouter = require('./src/routes/product_router');
const orderRouter = require('./src/routes/order_router');

const app = express();
app.disable('x-powered-by');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api', contactRouter);
app.use('/api', delivererRouter);
app.use('/api', productRouter);
app.use('/api', orderRouter);

app.listen(PORT, console.log(`Server running on port ${PORT}`));
