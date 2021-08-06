import database from '../lib/utils/database.js';
import request from 'supertest';
import app from '../lib/app.js';
import Actor from '../lib/models/Actor.js';


describe('actor routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });

  it('creates an actor via POST', async () => {
    const kermit = { name: 'Kermit', dob: '1995-05-09T07:00:00.000Z', pob: 'Oregon' };
    const res = await request(app)
      .post('/api/v1/actors/')
      .send(kermit);

    expect(res.body).toEqual({ id: 1, ...kermit });
  });

  it('gets an actor via GET:id', async () => {
    const kermit = { name: 'Kermit', dob: '1995-05-09T07:00:00.000Z', pob: 'Oregon' };
    const actor = await Actor.create(kermit);

    const res = await request(app)
      .get(`/api/v1/actors/${actor.id}`);

    expect(res.body).toEqual({ id: 1, ...kermit });
  });

  it('gets all actors via GET', async () => {
    const kermit = { name: 'Kermit', dob: '1995-05-09T07:00:00.000Z', pob: 'Oregon' };
    const chef = { name: 'The Swedish Chef', dob: '1991-01-01T08:00:00.000Z', pob: 'Sweden' };
    const piggy = { name: 'Ms. Piggy', dob: '1992-02-02T08:00:00.000Z', pob: 'Iowa' };


    await Actor.bulkCreate([kermit, chef, piggy]);

    const res = await request(app)
      .get('/api/v1/actors');

    expect(res.body).toEqual([{ id: 1, ...kermit }, { id: 2, ...chef }, { id: 3, ...piggy }]);
  });

  it('updates an actor via PATCH', async () => {
    const kermit = { name: 'Kremit', dob: '1995-05-09T07:00:00.000Z', pob: 'Oregon' };
    const actor = await Actor.create(kermit);

    const res = await request(app)
      .patch(`/api/v1/actors/${actor.id}`)
      .send({ name: 'Kermit' });

    expect(res.body).toEqual({ id: 1, name: 'Kermit', dob: '1995-05-09T07:00:00.000Z', pob: 'Oregon' });
  });
});
