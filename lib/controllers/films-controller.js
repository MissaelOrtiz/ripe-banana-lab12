import { Router } from 'express';
import Film from '../models/Film.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const film = await Film.create(req.body);

      res.send(film);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const film = await Film.findByPk(req.params.id);

      res.send(film);
    } catch (err) {
      next(err);
    }
  });
