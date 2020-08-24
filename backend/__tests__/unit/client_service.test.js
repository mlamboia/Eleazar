const app = require('../../src/app');
const faker = require('faker');
const ClientService = require('../../src/service/client_service');

describe('Client', () => {
  it('should create a client', async () => {
    const client = await ClientService.create({
      name: faker.name.findName(),
      city: faker.address.city(),
      neighborhood: faker.address.streetName(),
      address: faker.address.streetAddress(),
      deliverer_fee: faker.commerce.price(),
      phone: faker.phone.phoneNumber(),
      blocked: faker.random.boolean(),
    });

    console.log(client);
  });
});
