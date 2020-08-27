const app = require('../../src/app');
const db = require('../../src/database/index');
const factory = require('../factories');
const { address } = require('faker');

describe('Client', () => {
  beforeAll(async () => {
    await db.connect();
  });

  beforeEach(async () => {
    await db.truncate();
  });

  afterAll(async () => {
    await db.truncate();
    db.disconnect();
  });

  it('should be able to create client', async () => {
    const client = await factory.create('Client', {
      name: 'Matheus Viana',
      city: 'Osasco',
      neighborhood: 'Km 18',
      address: 'Rua Gasparino Lunardi, 252',
      phone: '984160601',
      deliverer_fee: 3,
    });

    expect(client.name).toBe('Matheus Viana');
    expect(client.city).toBe('Osasco');
    expect(client.neighborhood).toBe('Km 18');
    expect(client.address).toBe('Rua Gasparino Lunardi, 252');
    expect(client.deliverer_fee).toBe(3);
    expect(client.phone).toBe('984160601');
    expect(client.orders.length).toBe(0);
    expect(client.blocked).toBeFalsy();
  });

  it('should not be able to create client', async () => {
    try {
      await factory.create('Client', {
        name: 'aaa',
        city: 'aaa',
        neighborhood: 'aaa',
        address: 'aaa',
        deliverer_fee: -1,
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.errors.name.properties.message).toBe(
        'O nome do cliente deve possuir mais de 4 caracteres!'
      );
      expect(e.errors.city.properties.message).toBe(
        'O nome da cidade deve possuir mais de 4 caracteres!'
      );
      expect(e.errors.neighborhood.properties.message).toBe(
        'O nome do bairro deve possuir mais de 4 caracteres!'
      );
      expect(e.errors.address.properties.message).toBe(
        'O endereço deve possuir mais de 10 caracteres!'
      );
      expect(e.errors.deliverer_fee.properties.message).toBe(
        'O valor da entrega não pode ser menor que R$ 0,00!'
      );
    }

    try {
      await factory.create('Client', {
        name: 'a'.repeat(51),
        city: 'a'.repeat(51),
        neighborhood: 'a'.repeat(51),
        address: 'a'.repeat(101),
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.errors.name.properties.message).toBe(
        'O nome do cliente deve possuir menos de 50 caracteres!'
      );
      expect(e.errors.city.properties.message).toBe(
        'O nome da cidade deve possuir menos de 50 caracteres!'
      );
      expect(e.errors.neighborhood.properties.message).toBe(
        'O nome do bairro deve possuir menos de 50 caracteres!'
      );
      expect(e.errors.address.properties.message).toBe(
        'O endereço deve possuir menos de 100 caracteres!'
      );
    }
  });

  it('should not be able to create two clients with same phone number', async () => {
    try {
      await factory.create('Client', {
        phone: '984160601',
      });
      await factory.create('Client', {
        phone: '984160601',
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.code).toBe(11000);
    }
  });
});
