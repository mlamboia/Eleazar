const app = require('../../src/app');
const db = require('../../src/database/index');
const factory = require('../factories');
const OrderService = require('../../src/service/order_service');

describe('Client', () => {
  beforeAll(async () => {
    await db.connect();
    await db.truncate();
  });

  beforeEach(async () => {
    await db.truncate();
    this.client = await factory.create('Client');
    this.deliverer = await factory.create('Deliverer');
    this.product = await factory.create('Product');
  });

  afterAll(async () => {
    await db.truncate();
    db.disconnect();
  });

  it('should be able to create an order', async () => {
    const { client, deliverer, product } = this;

    const order = await OrderService.create({
      client: client._id,
      deliverer: deliverer._id,
      products: [
        {
          quantity: 2,
          product_name: product.name,
          unit_price: product.unit_price,
        },
        {
          quantity: 3,
          product_name: product.name,
          unit_price: product.unit_price,
        },
      ],
    });

    expect(order.client).toBe(client._id);
    expect(order.deliverer).toBe(deliverer._id);
    expect(order.products[0].quantity).toBe(2);
    expect(order.products[0].product_name).toBe(product.name);
    expect(order.products[0].unit_price).toBe(product.unit_price);
    expect(order.products[0].products_total_price).toBe(product.unit_price * 2);
    expect(order.products[1].quantity).toBe(3);
    expect(order.products[1].product_name).toBe(product.name);
    expect(order.products[1].unit_price).toBe(product.unit_price);
    expect(order.products[1].products_total_price).toBe(product.unit_price * 3);
    expect(order.order_total_price).toBe(
      product.unit_price * 2 + product.unit_price * 3
    );
    expect(order.products_total_quantity).toBe(5);
  });

  it('should not be able to create an order with undefined fields', async () => {
    try {
      await OrderService.create();
      expect(true).toBe(false);
    } catch (e) {
      expect(e.errors.client.properties.message).toBe(
        'É necessário um cliente!'
      );
      expect(e.errors.deliverer.properties.message).toBe(
        'É necessário um entregador!'
      );
      expect(e.errors.products.properties.message).toBe(
        'É necessário uma lista de produtos'
      );
    }
  });

  it('should be able to update a order', async () => {
    const { client, deliverer, product } = this;

    const order = await OrderService.create({
      client: client._id,
      deliverer: deliverer._id,
      products: [
        {
          quantity: 2,
          product_name: product.name,
          unit_price: product.unit_price,
        },
        {
          quantity: 3,
          product_name: product.name,
          unit_price: product.unit_price,
        },
      ],
    });
  });
});
