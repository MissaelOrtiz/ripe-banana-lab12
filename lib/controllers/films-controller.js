import { Router } from 'express';
import Film from '../models/Film.js';
import Studio from '../models/Studio.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const film = await Film.create(req.body, {
        attributes: ['id', 'realeased', 'title'],
        include: [{ model: Studio, attributes: ['id', 'name'] }]
      });

      res.send(film);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const film = await Film.findByPk(req.params.id, {
        attributes: ['id', 'released', 'title'],
        include: [{ model: Studio, attributes: ['id', 'name'] }]
      });

      res.send(film);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const film = await Film.findAll({
        attributes: ['id', 'title', 'released'],
        include: [{ model: Studio, attributes: ['id', 'name'] }]
      });

      res.send(film);
    } catch (err) {
      next(err);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const film =  await Film.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });

      res.send(film[1][0]);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      await Film.destroy({
        where: { id: req.params.id }
      });

      res.send({ success: true });
    } catch (err) {
      next(err);
    }
  });


