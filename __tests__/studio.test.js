import database from '../lib/utils/database.js';
import request from 'supertest';
import app from '../lib/app.js';
import Studio from '../lib/models/Studio.js';


describe('demo routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });
  
  it('creates a studio via POST', async () => {
    const bs = { name: 'Banana Studios', city: 'Portland', state: 'Oregon', country: 'US' };
    const res = await request(app)
      .post('/api/v1/studios/')
      .send(bs);

    expect(res.body).toEqual({ id: 1, ...bs });
  })

});
