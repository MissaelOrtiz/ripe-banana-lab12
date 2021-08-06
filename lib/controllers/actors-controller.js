import { Router } from 'express';
import Actor from '../models/Actor.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const actor = await Actor.create(req.body);

      res.send(actor);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const actor = await Actor.findByPk(req.params.id);

      res.send(actor);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const actors = await Actor.findAll();

      res.send(actors);
    } catch (err) {
      next(err);
    }
  });

