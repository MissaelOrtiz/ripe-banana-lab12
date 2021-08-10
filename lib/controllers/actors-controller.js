import { Router } from 'express';
import Actor from '../models/Actor.js';
import Film from '../models/Film.js';

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
      const actor = await Actor.findOne({
        where: { id: req.params.id },
        attributes: ['name', 'dob', 'pob'],
        include: { model: Film, through: { attributes: [] }, attributes: ['id', 'title', 'released'] }
      });

      res.send(actor);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const actors = await Actor.findAll({
        attributes: ['id', 'name']
      });

      res.send(actors);
    } catch (err) {
      next(err);
    }
  })
  
  .patch('/:id', async (req, res, next) => {
    try {
      const actor =  await Actor.update(req.body, {
        where: { id: req.params.id },
        returning: true
      });

      res.send(actor[1][0]);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      await Actor.destroy({
        where: { id: req.params.id }
      });

      res.send({ success: true });
    } catch (err) {
      next(err);
    }
  });

