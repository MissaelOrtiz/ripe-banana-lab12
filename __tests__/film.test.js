import database from '../lib/utils/database.js';
import request from 'supertest';
import app from '../lib/app.js';
import Film from '../lib/models/Film.js';
import Studio from '../lib/models/Studio.js';
import Actor from '../lib/models/Actor.js';
import Reviewer from '../lib/models/Reviewer.js';
import Review from '../lib/models/Review.js';


describe('film routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });

  it('creates a film via POST', async () => {
    const studio = await Studio.create({ name: 'Banana Studios', city: 'Portland', state: 'Oregon', country: 'US' });

    const be = { title: 'Banana Express', StudioId: studio.id, released: '2021' };

    const res = await request(app)
      .post('/api/v1/films/')
      .send(be);

    expect(res.body).toEqual({ id: 1, ...be });
  });

  it('gets a film via GET:id', async () => {
    const studio = await Studio.create({ name: 'Banana Studios', city: 'Portland', state: 'Oregon', country: 'US' });

    const be = { title: 'Banana Express', StudioId: studio.id, released: '2021' };
    const film = await Film.create(be);

    const kermit = { name: 'Kermit', dob: '1995-05-09T07:00:00.000Z', pob: 'Oregon', FilmId: 1 };
    const actor = await Actor.create(kermit);

    const reviewer = await Reviewer.create({ name: 'Dick Johnson', company: 'Banana Reviews' });

    const review = await Review.create({ rating: 5, ReviewerId: reviewer.id, review: 'It good', FilmId: be.id });

    await actor.setFilms(film);
    await film.setActors(actor);
    await film.setReviews(review);

    const res = await request(app)
      .get(`/api/v1/films/${film.id}`);

    expect(res.body).toEqual({ id: 1, 
      title: 'Banana Express',
      released: '2021',
      Studio: { id: 1, name: 'Banana Studios' },
      Actors: [{ id: 1, name: 'Kermit' }],
      Reviews: [{ id: 1, rating: 5, review: 'It good', Reviewer: { id: 1, name: 'Dick Johnson' } }]
    });
  });

  it('gets all film via GET', async () => {
    const studio = await Studio.create({ name: 'Banana Studios', city: 'Portland', state: 'Oregon', country: 'US' });

    
    const be1 = { title: 'Banana Express 1', StudioId: studio.id, released: '2021' };
    const be2 = { title: 'Banana Express 2', StudioId: studio.id, released: '2021' };
    const be3 = { title: 'Banana Express 3', StudioId: studio.id, released: '2021' };


    await Film.bulkCreate([be1, be2, be3]);

    const res = await request(app)
      .get('/api/v1/films');

    expect(res.body).toEqual([{ id: 1, title: 'Banana Express 1', released: '2021', Studio: { id: 1, name: 'Banana Studios' } }, { id: 2, title: 'Banana Express 2', released: '2021', Studio: { id: 1, name: 'Banana Studios' } }, { id: 3, title: 'Banana Express 3', released: '2021', Studio: { id: 1, name: 'Banana Studios' } }]);
  });

  it('updates a film via PATCH', async () => {
    const studio = await Studio.create({ name: 'Banana Studios', city: 'Portland', state: 'Oregon', country: 'US' });
    const be = { title: 'Banana Express 1', StudioId: studio.id, released: '2021' };
    const film = await Film.create(be);

    const res = await request(app)
      .patch(`/api/v1/films/${film.id}`)
      .send({ title: 'Banana Express 10' });

    expect(res.body).toEqual({ id: 1, title: 'Banana Express 10', StudioId: studio.id, released: '2021' });
  });

  it('deletes a film via DELETE', async () => {
    const studio = await Studio.create({ name: 'Banana Studios', city: 'Portland', state: 'Oregon', country: 'US' });
    const be = { title: 'Banana Express 1', studio: `${studio.id}`, released: '2021' };
    const film = await Film.create(be);

    const res = await request(app)
      .delete(`/api/v1/films/${film.id}`);

    expect(res.body).toEqual({ success: true });
  });
});
