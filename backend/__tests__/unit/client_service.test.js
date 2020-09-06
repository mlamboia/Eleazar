const app = require('../../src/app');
const db = require('../../src/database/index');
const factory = require('../factories');
const ClientService = require('../../src/service/client_service');

describe('Client', () => {
  beforeAll(async () => {
    await db.connect();
    await db.truncate();
  });

  beforeEach(async () => {
    await db.truncate();
  });

  afterAll(async () => {
    await db.truncate();
    db.disconnect();
  });

  it('should be able to create client with valid fields', async () => {
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

  it('should not be able to create client with undefined fields', async () => {
    try {
      await ClientService.create();
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

  it('should not be able to create client with fields that have less characters or lower value than necessary', async () => {
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
      await ClientService.create({
        name: 'a'.repeat(51),
        city: 'a'.repeat(51),
        neighborhood: 'a'.repeat(51),
        address: 'a'.repeat(101),
        phone: '984160601',
        deliverer_fee: 3,
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
    await ClientService.create({
      name: 'Matheus Viana',
      city: 'Osasco',
      neighborhood: 'Km 18',
      address: 'Rua Gasparino Lunardi, 252',
      phone: '984160601',
      deliverer_fee: 3,
    });

    await ClientService.create({
      name: 'Matheus Viana',
      city: 'Osasco',
      neighborhood: 'Km 18',
      address: 'Rua Gasparino Lunardi, 252',
      phone: '984160601',
      deliverer_fee: 3,
    }).catch(async (e) => {
      await expect(e.code).toBe(11000);
    });
  });

  it('should be able to update a client', async () => {
    const client = await factory.create('Client');
    const body = {
      name: 'Matheus Viana',
      city: 'Osasco',
      neighborhood: 'Km 18',
      address: 'Rua Gasparino Lunardi, 252',
      phone: '984160601',
      deliverer_fee: 3,
    };
    const updatedClient = await ClientService.update(client._id, body);

    expect(updatedClient.name).toBe('Matheus Viana');
    expect(updatedClient.city).toBe('Osasco');
    expect(updatedClient.neighborhood).toBe('Km 18');
    expect(updatedClient.address).toBe('Rua Gasparino Lunardi, 252');
    expect(updatedClient.phone).toBe('984160601');
    expect(updatedClient.deliverer_fee).toBe(3);
  });

  it('should be able to block a client', async () => {
    const client = await factory.create('Client');
    const blockedClient = await ClientService.block(client._id);

    expect(blockedClient.blocked).toBe(true);
  });

  it('should be able to unblock a client', async () => {
    const client = await factory.create('Client', {
      blocked: true,
    });
    const unblockedClient = await ClientService.unblock(client._id);

    expect(unblockedClient.blocked).toBe(false);
  });

  it('should be able to return a client', async () => {
    const client = await factory.create('Client');
    const clientFound = await ClientService.findClient(client._id);

    expect(clientFound.name).toBe(client.name);
    expect(clientFound.city).toBe(client.city);
    expect(clientFound.neighborhood).toBe(client.neighborhood);
    expect(clientFound.address).toBe(client.address);
    expect(clientFound.phone).toBe(client.phone);
    expect(clientFound.deliverer_fee).toBe(client.deliverer_fee);
  });

  it('should be able to return a list of unblocked clients', async () => {
    const clients = [];
    clients.push(await factory.create('Client'));
    clients.push(
      await factory.create('Client', {
        phone: '984160601',
      })
    );
    const clientsFound = await ClientService.findClients();

    for (let i = 0; i < 2; i++) {
      expect(clientsFound[i].name).toBe(clients[i].name);
      expect(clientsFound[i].city).toBe(clients[i].city);
      expect(clientsFound[i].neighborhood).toBe(clients[i].neighborhood);
      expect(clientsFound[i].address).toBe(clients[i].address);
      expect(clientsFound[i].phone).toBe(clients[i].phone);
      expect(clientsFound[i].deliverer_fee).toBe(clients[i].deliverer_fee);
    }
  });

  it('should not be able return a list of blocked clients', async () => {
    const clients = [];
    clients.push(
      await factory.create('Client', {
        blocked: true,
      })
    );
    clients.push(
      await factory.create('Client', {
        phone: '984160601',
        blocked: true,
      })
    );
    const clientsFound = await ClientService.findClients();

    expect(clientsFound.length).toBe(0);
  });
});
