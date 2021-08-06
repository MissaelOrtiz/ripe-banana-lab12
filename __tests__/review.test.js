import database from '../lib/utils/database.js';
import request from 'supertest';
import app from '../lib/app.js';
import Studio from '../lib/models/Studio.js';
import Film from '../lib/models/Film.js';
import Reviewer from '../lib/models/Reviewer.js';


describe('reviews routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });

  it('creates a review via POST', async () => {
    const studio = await Studio.create({ name: 'Banana Studios', city: 'Portland', state: 'Oregon', country: 'US' });
    const reviewer = await Reviewer.create({ name: 'Dick Johnson', company: 'Banana Reviews' });
    const be = await Film.create({ title: 'Banana Express', studio: `${studio.id}`, released: '2021' });

    const review = { rating: 5, reviewer: `${reviewer.id}`, review: 'It good', film: be.id };

    const res = await request(app)
      .post('/api/v1/reviews/')
      .send(review);

    expect(res.body).toEqual({ id: 1, ...review });
  });

});
