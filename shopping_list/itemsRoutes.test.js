// process.env.NODE_ENV = "test"

const request = require('supertest');
const datastore = require('./data');

const app = require('./app');

let items = datastore.items;

let item = { id: 1, product: 'pickles', amount: 3.5 };

afterEach(() => {
  items.length = 0;
  datastore.emptyDataStore();
});

describe('Display all items', () => {
  beforeEach(() => {
    items.push(item);
    datastore.writeDataToDataStore();
  });
  test('Get all items in the shopping cart', async () => {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ items: [item] });
  });
});

describe('POST /items', () => {
  test('Creating an item', async () => {
    const res = await request(app)
      .post('/items')
      .send({ product: 'tomatoes', amount: 3.5 });
    expect(res.statusCode).toBe(201);
    expect(res.body.items).toEqual({
      item: { id: 1, product: 'tomatoes', amount: 3.5 },
    });
  });
});

describe('PATCH /items/:id', () => {
  beforeEach(() => {
    items.push(item);
    datastore.writeDataToDataStore();
  });
  test('Updating an item', async () => {
    const res = await request(app)
      .patch(`/items/${item.id}`)
      .send({ product: 'kosher pickles' });
    expect(res.statusCode).toBe(200);
    expect(res.body.items).toEqual({
      item: { id: 1, product: 'kosher pickles', amount: 3.5 },
    });
  });
  test('Responds with 404 for invalid name', async () => {
    const res = await request(app)
      .patch(`/items/2000`)
      .send({ product: 'gala apples' });
    expect(res.statusCode).toBe(404);
  });
});

describe('DELETE /items/:id', () => {
  beforeEach(() => {
    items.push(item);
    datastore.writeDataToDataStore();
  });
  test('Deleted an item', async () => {
    const res = await request(app).delete(`/items/${item.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      status: 'success',
      message: 'Successfully deleted',
    });
  });
  test('Responds with 404 for invalid name', async () => {
    const res = await request(app)
      .patch(`/items/0`)
      .send({ product: 'gala apples' });
    expect(res.statusCode).toBe(404);
  });
});
