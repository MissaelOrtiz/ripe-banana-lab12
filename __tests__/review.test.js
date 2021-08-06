import database from '../lib/utils/database.js';
import request from 'supertest';
import app from '../lib/app.js';


describe('reviews routes', () => {
  beforeEach(() => {
    return database.sync({ force: true });
  });

  it('creates a review via POST', async () => {

  });

});
