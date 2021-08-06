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

  it('gets a reviewer via GET:id', async () => {
    const dj = { name: 'Dick Johnson', company: 'Banana Reviews' };
    const reviewer = await Reviewer.create(dj);

    const res = await request(app)
      .get(`/api/v1/reviewers/${reviewer.id}`);

    expect(res.body).toEqual({ id: 1, ...dj });
  });

  it('gets all reviewers via GET', async () => {
    const dj = { name: 'Dick Johnson', company: 'Banana Reviews' };
    const dj2 = { name: 'Derek Johnson', company: 'The Onion' };
    const dj3 = { name: 'Daquan Johnson', company: 'Huff Post' };

    await Reviewer.bulkCreate([dj, dj2, dj3]);

    const res = await request(app)
      .get('/api/v1/reviewers');

    expect(res.body).toEqual([{ id: 1, ...dj }, { id: 2, ...dj2 }, { id: 3, ...dj3 }]);
  });

  it('updates a reviewer via PATCH', async () => {
    const dj = { name: 'Dick Johnson', company: 'Banana Reviews' };
    const reviewer = await Reviewer.create(dj);

    const res = await request(app)
      .patch(`/api/v1/reviewers/${reviewer.id}`)
      .send({ name: 'Richard Johnson' });

    expect(res.body).toEqual({ id: 1, name: 'Richard Johnson', company: 'Banana Reviews' });
  });

  it('deletes a reviewer via DELETE', async () => {
    const dj = { name: 'Dick Johnson', company: 'Banana Reviews' };
    const reviewer = await Reviewer.create(dj);

    const res = await request(app)
      .delete(`/api/v1/reviewers/${reviewer.id}`);

    expect(res.body).toEqual({ success: true });
  });
});
