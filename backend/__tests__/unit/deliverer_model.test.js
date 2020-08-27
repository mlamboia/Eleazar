const app = require('../../src/app');
const db = require('../../src/database/index');
const factory = require('../factories');

describe('Deliverer', () => {
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

  it('should be able to create deliverer', async () => {
    const deliverer = await factory.create('Deliverer', {
      name: 'Matheus Viana',
    });

    expect(deliverer.name).toBe('Matheus Viana');
    expect(deliverer.blocked).toBeFalsy();
  });

  it('should not be able to create deliverer with undefined fields', async () => {
    try {
      await factory.create('Deliverer', {
        name: undefined,
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.errors.name.properties.message).toBe(
        'É necessário o nome do entregador'
      );
    }
  });

  it('should not be able to create deliverer with fields that have less characters than necessary', async () => {
    try {
      await factory.create('Deliverer', {
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
      await factory.create('Deliverer', {
        name: 'a'.repeat(51),
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.errors.name.properties.message).toBe(
        'O nome do entregador deve possuir menos de 50 caracteres!'
      );
    }
  });
});
