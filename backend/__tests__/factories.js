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
  deliverer_fee: faker.commerce.price(),
  phone: faker.phone.phoneNumber(),
  blocked: faker.random.boolean(),
});

factory.define('Deliverer', Deliverer, {
  name: faker.name.findName(),
  blocked: faker.random.boolean(),
});

factory.define('Order', Order, {
  products: {
    type: [
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
  },
});

factory.define('Product', Product, {
  name: faker.commerce.productName(),
  unit_price: faker.random.number({ min: 10, max: 30 }),
  observation: faker.lorem.sentence(),
  dish_day: faker.random.boolean(),
  blocked: faker.random.boolean(),
});

module.exports = factory;
