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
  });

  it('gets a studio via GET:id', async () => {
    const bs = { name: 'Banana Studios', city: 'Portland', state: 'Oregon', country: 'US' };
    const studio = await Studio.create(bs);

    const res = await request(app)
      .get(`/api/v1/studios/${studio.id}`);

    expect(res.body).toEqual({ id: 1, ...bs });
  });

  it('gets all studios via GET', async () => {
    const bs = { name: 'Banana Studios', city: 'Portland', state: 'Oregon', country: 'US' };
    const dream = { name: 'Dreamworks', city: 'Portland', state: 'Oregon', country: 'US' };
    const sony = { name: 'Sony', city: 'Portland', state: 'Oregon', country: 'US' };

    await Studio.bulkCreate([bs, dream, sony]);

    const res = await request(app)
      .get('/api/v1/studios');

    expect(res.body).toEqual([{ id: 1, ...bs }, { id: 2, ...dream }, { id: 3, ...sony }]);
  });

  it('udpates studio via PATCH', async () => {
    const bs = { name: 'Barbara Studios', city: 'Portland', state: 'Oregon', country: 'US' };
    const studio = await Studio.create(bs);

    const res = await request(app)
      .patch(`/api/v1/studios/${studio.id}`)
      .send({ name: 'Banana Studios' });

    expect(res.body).toEqual({ id: 1, name: 'Banana Studios', city: 'Portland', state: 'Oregon', country: 'US' });
  });
});
