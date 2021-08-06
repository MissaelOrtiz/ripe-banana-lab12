import database from '../lib/utils/database.js';
import request from 'supertest';
import app from '../lib/app.js';
import Studio from '../lib/models/Studio.js';
import Film from '../lib/models/Film.js';
import Reviewer from '../lib/models/Reviewer.js';
import Review from '../lib/models/Review.js';

describe('reviews routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });

  it('creates a review via POST', async () => {
    const studio = await Studio.create({ name: 'Banana Studios', city: 'Portland', state: 'Oregon', country: 'US' });
    const reviewer = await Reviewer.create({ name: 'Dick Johnson', company: 'Banana Reviews' });
    const be = await Film.create({ title: 'Banana Express', studio: `${studio.id}`, released: '2021' });

    const review = { rating: 5, reviewer: `${reviewer.id}`, review: 'It good', film: `${be.id}` };

    const res = await request(app)
      .post('/api/v1/reviews/')
      .send(review);

    expect(res.body).toEqual({ id: 1, ...review });
  });

  it('gets a review via GET:id', async () => {
    const studio = await Studio.create({ name: 'Banana Studios', city: 'Portland', state: 'Oregon', country: 'US' });
    const reviewer = await Reviewer.create({ name: 'Dick Johnson', company: 'Banana Reviews' });
    const be = await Film.create({ title: 'Banana Express', studio: `${studio.id}`, released: '2021' });

    const review = await Review.create({ rating: 5, reviewer: `${reviewer.id}`, review: 'It good', film: `${be.id}` });

    const res = await request(app)
      .get(`/api/v1/reviews/${review.id}`);

    expect(res.body).toEqual({ id: 1, ...review.toJSON() });
  });

  it('gets all reviews via GET', async () => {
    const studio = await Studio.create({ name: 'Banana Studios', city: 'Portland', state: 'Oregon', country: 'US' });
    const reviewer = await Reviewer.create({ name: 'Dick Johnson', company: 'Banana Reviews' });
    const be = await Film.create({ title: 'Banana Express', studio: `${studio.id}`, released: '2021' });

    const review1 = { rating: 5, reviewer: `${reviewer.id}`, review: 'It good', film: `${be.id}` };
    const review2 = { rating: 1, reviewer: `${reviewer.id}`, review: 'Nevermind I actually watched the movie', film: `${be.id}` };

    await Review.bulkCreate([review1, review2]);

    const res = await request(app)
      .get('/api/v1/reviews');

    expect(res.body).toEqual([{ id: 1, ...review1 }, { id: 2, ...review2 }]);
  });

  it('updates a review via PATCH', async () => {
    const studio = await Studio.create({ name: 'Banana Studios', city: 'Portland', state: 'Oregon', country: 'US' });
    const reviewer = await Reviewer.create({ name: 'Dick Johnson', company: 'Banana Reviews' });
    const be = await Film.create({ title: 'Banana Express', studio: `${studio.id}`, released: '2021' });

    const review = await Review.create({ rating: 1, reviewer: `${reviewer.id}`, review: 'It good', film: `${be.id}` });

    const res = await request(app)
      .patch(`/api/v1/reviews/${review.id}`)
      .send({ rating: 5 });

    expect(res.body).toEqual({  id: 1, rating: 5, reviewer: `${reviewer.id}`, review: 'It good', film: `${be.id}` });
  });
});
