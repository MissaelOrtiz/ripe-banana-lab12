import database from '../lib/utils/database.js';
import request from 'supertest';
import app from '../lib/app.js';
import Actor from '../lib/models/Actor.js';


describe('actor routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });

  it('creates an actor via POST', async () => {
    const kermit = { name: 'Kermit', dob: '05/09/1995', pob: 'Oregon' };
    const res = await request(app)
      .post('/api/v1/actors/')
      .send(kermit);

    expect(res.body).toEqual({ id: 1, ...kermit });
  });
});
