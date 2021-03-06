import database from '../lib/utils/database.js';
import request from 'supertest';
import app from '../lib/app.js';
import Actor from '../lib/models/Actor.js';
import Studio from '../lib/models/Studio.js';
import Film from '../lib/models/Film.js';

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
    const kermit = { name: 'Kermit', dob: '1995-05-09T07:00:00.000Z', pob: 'Oregon', FilmId: 1 };
    const actor = await Actor.create(kermit);

    
    const studio = await Studio.create({ name: 'Banana Studios', city: 'Portland', state: 'Oregon', country: 'US' });
    const be = { title: 'Banana Express', StudioId: studio.id, released: '2021', ActorId: 1 };
    const film = await Film.create(be);
    
    await actor.setFilms(film);
    await film.setActors(actor);


    const res = await request(app)
      .get(`/api/v1/actors/${actor.id}`);

    expect(res.body).toEqual({ name: 'Kermit', dob: '1995-05-09T07:00:00.000Z', pob: 'Oregon', Films: [{ id: 1, title: 'Banana Express', released: '2021' }] });
  });

  it('gets all actors via GET', async () => {
    const kermit = { name: 'Kermit', dob: '1995-05-09T07:00:00.000Z', pob: 'Oregon' };
    const chef = { name: 'The Swedish Chef', dob: '1991-01-01T08:00:00.000Z', pob: 'Sweden' };
    const piggy = { name: 'Ms. Piggy', dob: '1992-02-02T08:00:00.000Z', pob: 'Iowa' };


    await Actor.bulkCreate([kermit, chef, piggy]);

    const res = await request(app)
      .get('/api/v1/actors');

    expect(res.body).toEqual([{ id: 1, name: 'Kermit' }, { id: 2, name: 'The Swedish Chef' }, { id: 3, name: 'Ms. Piggy' }]);
  });

  it('updates an actor via PATCH', async () => {
    const kermit = { name: 'Kremit', dob: '1995-05-09T07:00:00.000Z', pob: 'Oregon' };
    const actor = await Actor.create(kermit);

    const res = await request(app)
      .patch(`/api/v1/actors/${actor.id}`)
      .send({ name: 'Kermit' });

    expect(res.body).toEqual({ id: 1, name: 'Kermit', dob: '1995-05-09T07:00:00.000Z', pob: 'Oregon' });
  });

  it('deletes an actor via DELETE', async () => {
    const kermit = { name: 'Kremit', dob: '1995-05-09T07:00:00.000Z', pob: 'Oregon' };
    const actor = await Actor.create(kermit);

    const res = await request(app)
      .delete(`/api/v1/actors/${actor.id}`);

    expect(res.body).toEqual({ success: true });
  });
});
