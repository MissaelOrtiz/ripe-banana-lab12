import { Router } from 'express';
import Film from '../models/Film.js';
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
      const studio = await Studio.findByPk(req.params.id, {
        attributes: ['id', 'name', 'city', 'state', 'country'],
        include: [{ model: Film, attributes: ['id', 'title'] }]
      });

      res.send(studio);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const studios = await Studio.findAll({ attributes: ['id', 'name'] });

      res.send(studios);
    } catch (err) {
      next(err);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const studio =  await Studio.update(req.body, {
        where: { id: req.params.id },
        returning: true
      });

      res.send(studio[1][0]);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      await Studio.destroy({
        where: { id: req.params.id }
      });

      res.send({ success: true });
    } catch (err) {
      next(err);
    }
  });

