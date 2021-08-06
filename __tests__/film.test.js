import database from '../lib/utils/database.js';
import request from 'supertest';
import app from '../lib/app.js';
import Film from '../lib/models/Film.js';
import Studio from '../lib/models/Studio.js';


describe('film routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });

  it('creates a film via POST', async () => {
    const studio = await Studio.create({ name: 'Banana Studios', city: 'Portland', state: 'Oregon', country: 'US' });

    const be = { title: 'Banana Express', studio: studio.id, released: 2021 };

    const res = await request(app)
      .post('/api/v1/films/')
      .send(be);

    expect(res.body).toEqual({ id: 1, ...be });
  });

});
