import database from '../lib/utils/database.js';
import request from 'supertest';
import app from '../lib/app.js';
import Reviewer from '../lib/models/Reviewer.js';


describe('reviewers routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });

  it('creates a reviewer via POST', async () => {
    const dj = { name: 'Dick Johnson', company: 'Banana Reviews' };
    const res = await request(app)
      .post('/api/v1/reviewers/')
      .send(dj);

    expect(res.body).toEqual({ id: 1, ...dj });
  });

});
