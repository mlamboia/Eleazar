const app = require('../../src/app');
const db = require('../../src/database/index');
const factory = require('../factories');
const ClientService = require('../../src/service/client_service');

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

  it('should not be able to create client with null field', async () => {
    await ClientService.create({
      name: 'Matheus Viana',
      city: 'Osasco',
      neighborhood: 'Km 18',
      address: 'Rua Gasparino Lunardi, 252',
      phone: '984160601',
      deliverer_fee: 3,
    }).then((client) => {
      expect(client.name).toBe('Matheus Viana');
      expect(client.city).toBe('Osasco');
      expect(client.neighborhood).toBe('Km 18');
      expect(client.address).toBe('Rua Gasparino Lunardi, 252');
      expect(client.deliverer_fee).toBe(3);
      expect(client.phone).toBe('984160601');
      expect(client.orders.length).toBe(0);
      expect(client.blocked).toBeFalsy();
    });
  });

  it('should be able to create client with undefined fields', async () => {
    try {
      await ClientService.create({
        name: undefined,
        city: undefined,
        neighborhood: undefined,
        address: undefined,
        phone: undefined,
        deliverer_fee: undefined,
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.errors.name.properties.message).toBe(
        'É necessário o nome do cliente!'
      );
      expect(e.errors.city.properties.message).toBe(
        'É necessário a cidade do cliente!'
      );
      expect(e.errors.neighborhood.properties.message).toBe(
        'É necessário o bairro do cliente!'
      );
      expect(e.errors.address.properties.message).toBe(
        'É necessário o endereço do cliente!'
      );
      expect(e.errors.deliverer_fee.properties.message).toBe(
        'É necessário o valor da entrega!'
      );
      expect(e.errors.phone.properties.message).toBe(
        'É necessário um telefone!'
      );
    }
  });

  it('should not be able to create client with fields that have less characters than necessary', async () => {
    try {
      await ClientService.create({
        name: 'aaa',
        city: 'aaa',
        neighborhood: 'aaa',
        address: 'aaa',
        phone: '984160601',
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
  });

  it('should not be able to create client with fields that have more characters than necessary', async () => {
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
    await factory.create('Client', {
      phone: '984160601',
    });

    await factory
      .create('Client', {
        phone: '984160601',
      })
      .catch(async (e) => {
        await expect(e.code).toBe(11000);
      });
  });
});
