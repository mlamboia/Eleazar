const app = require('../../src/app');
const db = require('../../src/database/index');
const DelivererService = require('../../src/service/deliverer_service');
const factory = require('../factories');

describe('Deliverer', () => {
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

  it('should be able to create deliverer', async () => {
    const deliverer = await DelivererService.create({
      name: 'Matheus Viana',
    });

    expect(deliverer.name).toBe('Matheus Viana');
    expect(deliverer.blocked).toBeFalsy();
  });

  it('should not be able to create deliverer with undefined fields', async () => {
    try {
      await DelivererService.create();
      expect(true).toBe(false);
    } catch (e) {
      expect(e.errors.name.properties.message).toBe(
        'É necessário o nome do entregador'
      );
    }
  });

  it('should not be able to create deliverer with fields that have less characters than necessary', async () => {
    try {
      await DelivererService.create({
        name: 'aaa',
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.errors.name.properties.message).toBe(
        'O nome do entregador deve possuir mais de 4 caracteres!'
      );
    }
  });

  it('should not be able to create deliverer with fields that have more characters than necessary', async () => {
    try {
      await DelivererService.create({
        name: 'a'.repeat(51),
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.errors.name.properties.message).toBe(
        'O nome do entregador deve possuir menos de 50 caracteres!'
      );
    }
  });

  it('should be able to update a deliverer', async () => {
    const deliverer = await factory.create('Deliverer');
    const body = {
      name: 'Matheus',
    };

    const updatedDeliverer = await DelivererService.update(deliverer._id, body);

    expect(updatedDeliverer.name).toBe('Matheus');
  });

  it('should be able to block a deliverer', async () => {
    const deliverer = await factory.create('Deliverer');
    const blockedDeliverer = await DelivererService.block(deliverer._id);

    expect(blockedDeliverer.blocked).toBe(true);
  });

  it('should be able to block a deliverer', async () => {
    const deliverer = await factory.create('Deliverer', {
      blocked: true,
    });
    const unblockedDeliverer = await DelivererService.unblock(deliverer._id);

    expect(unblockedDeliverer.blocked).toBe(false);
  });

  it('should be able to return a deliverer', async () => {
    const deliverer = await factory.create('Deliverer');
    const delivererFound = await DelivererService.findDeliverer(deliverer._id);

    expect(delivererFound.name).toBe(deliverer.name);
  });

  it('should be able to return a list of unblocked deliverers', async () => {
    const deliverers = [];
    deliverers.push(await factory.create('Deliverer'));
    deliverers.push(await factory.create('Deliverer'));
    const deliverersFound = await DelivererService.findDeliverers();

    for (let i = 0; i < 2; i++) {
      expect(deliverersFound[i].name).toBe(deliverers[i].name);
    }
  });

  it('should not be able return a list of blocked deliverers', async () => {
    const deliverers = [];
    deliverers.push(
      await factory.create('Deliverer', {
        blocked: true,
      })
    );
    deliverers.push(
      await factory.create('Deliverer', {
        blocked: true,
      })
    );
    const deliverersFound = await DelivererService.findDeliverers();

    expect(deliverersFound.length).toBe(0);
  });
});
