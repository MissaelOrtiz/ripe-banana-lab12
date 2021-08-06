import { Router } from 'express';
import Studio from '../models/Studio.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const studio = await Studio.create(req.body);

      res.send(studio);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const studio = await Studio.findByPk(req.params.id);

      res.send(studio);
    } catch (err) {
      next(err);
    }
  });
