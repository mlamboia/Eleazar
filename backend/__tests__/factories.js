const faker = require('faker');
const { factory } = require('factory-girl');

const Client = require('../src/model/client_model');
const Deliverer = require('../src/model/deliverer_model');
const Order = require('../src/model/order_model');
const Product = require('../src/model/product_model');

factory.define('Client', Client, {
  name: faker.name.findName(),
  city: faker.address.city(),
  neighborhood: faker.address.streetName(),
  address: faker.address.streetAddress(),
  phone: faker.phone.phoneNumberFormat(3),
  deliverer_fee: faker.random.number({ min: 0, max: 10 }),
});

factory.define('Deliverer', Deliverer, {
  name: faker.name.findName(),
});

factory.define('Order', Order, {
  products: [
    {
      quantity: faker.random.number({ min: 0, max: 10 }),
      product_name: faker.commerce.productName(),
      unit_price: faker.random.number({ min: 10, max: 30 }),
    },
    {
      quantity: faker.random.number({ min: 0, max: 10 }),
      product_name: faker.commerce.productName(),
      unit_price: faker.random.number({ min: 10, max: 30 }),
    },
  ],
});

factory.define('Product', Product, {
  name: faker.commerce.productName(),
  unit_price: faker.random.number({ min: 10, max: 30 }),
  observation: faker.lorem.sentence(),
});

module.exports = factory;
