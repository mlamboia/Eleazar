const app = require('../../src/app');
const db = require('../../src/database/index');
const ProductService = require('../../src/service/product_service');

describe('Product', () => {
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

  it('should be able to create product', async () => {
    const product = await ProductService.create({
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
      await ProductService.create();
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
      await ProductService.create({
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
      await ProductService.create({
        name: 'a'.repeat(51),
        unit_price: 15,
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.errors.name.properties.message).toBe(
        'O nome do produto deve possuir menos de 50 caracteres!'
      );
    }
  });

  it('should not be able to create two products with same name', async () => {
    await ProductService.create({
      name: 'Marmitex',
      unit_price: 15,
    });

    ProductService.create({
      name: 'Marmitex',
      unit_price: 15,
    }).catch(async (e) => {
      await expect(e.code).toBe(11000);
    });
  });
});
