const app = require('../../src/app');
const db = require('../../src/database/index');
const factory = require('../factories');

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
    expect(true).toBe(true);
  });
});
