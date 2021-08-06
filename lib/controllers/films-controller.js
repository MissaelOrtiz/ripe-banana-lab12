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
      const film = { id: 1, title: 'Banana Express', studio: '1', released: '2021' };

      res.send(film);
    } catch (err) {
      next(err);
    }
  })