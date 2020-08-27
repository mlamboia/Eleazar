const app = require('../../src/app');
const db = require('../../src/database/index');
const factory = require('../factories');
const { address } = require('faker');

describe('Product', () => {
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

  it('should be able to create product', async () => {
    const product = await factory.create('Product', {
      name: 'Marmitex',
      unit_price: 15,
      observation: 'Observação',
    });

    expect(product.name).toBe('Marmitex');
    expect(product.unit_price).toBe(15);
    expect(product.observation).toBe('Observação');
    expect(product.dish_day).toBeFalsy();
    expect(product.blocked).toBeFalsy();
  });

  it('should not be able to create deliverer with undefined fields', async () => {
    try {
      await factory.create('Product', {
        name: undefined,
        unit_price: undefined,
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.errors.name.properties.message).toBe(
        'É necessário o nome do produto!'
      );
      expect(e.errors.unit_price.properties.message).toBe(
        'É necessário o preço do produto!'
      );
    }
  });

  it('should not be able to create product with fields that have less characters than necessary', async () => {
    try {
      await factory.create('Product', {
        name: 'aaa',
        unit_price: 0,
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.errors.name.properties.message).toBe(
        'O nome do produto deve possuir mais de 4 caracteres!'
      );
      expect(e.errors.unit_price.properties.message).toBe(
        'O preço minimo de um produto não pode ser menor que R$1,00!'
      );
    }
  });

  it('should not be able to create product with fields that have more characters than necessary', async () => {
    try {
      await factory.create('Product', {
        name: 'a'.repeat(51),
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.errors.name.properties.message).toBe(
        'O nome do produto deve possuir menos de 50 caracteres!'
      );
    }
  });

  it('should not be able to create two products with same name', async () => {
    await factory.create('Product', {
      name: 'Marmitex',
    });
    try {
      await factory.create('Product', {
        name: 'Marmitex',
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.code).toBe(11000);
    }
  });
});
