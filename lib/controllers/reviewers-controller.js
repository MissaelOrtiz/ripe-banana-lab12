import { Router } from 'express';
import Reviewer from '../models/Reviewer.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const reviewer = await Reviewer.create(req.body);

      res.send(reviewer);
    } catch (err) {
      next(err);
    }
  })
  
  .get('/:id', async (req, res, next) => {
    try {
      const reviewer = await Reviewer.findByPk(req.params.id);

      res.send(reviewer);
    } catch (err) {
      next(err);
    }
  })
  
  .get('/', async (req, res, next) => {
    try {
      const dj = { name: 'Dick Johnson', company: 'Banana Reviews' };
      const dj2 = { name: 'Derek Johnson', company: 'The Onion' };
      const dj3 = { name: 'Daquan Johnson', company: 'Huff Post' };
      const reivewers = [{ id: 1, ...dj }, { id: 2, ...dj2 }, { id: 3, ...dj3 }];

      res.send(reivewers);
    } catch (err) {
      next(err);
    }
  });

