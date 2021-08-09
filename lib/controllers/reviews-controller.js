import { Router } from 'express';
import Review from '../models/Review.js';
import Film from '../models/Film.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const review = await Review.create(req.body);

      res.send(review);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const review = await Review.findByPk(req.params.id);

      res.send(review);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const reviews = await Review.findAll({
        attributes: ['id', 'rating', 'review'],
        include: [{model: Film, attributes: ['id', 'title']}] 
      });

      res.send(reviews);
    } catch (err) {
      next(err);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const review =  await Review.update(req.body, {
        where: { id: req.params.id },
        returning: true
      });

      res.send(review[1][0]);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      await Review.destroy({
        where: { id: req.params.id }
      });

      res.send({ success: true });
    } catch (err) {
      next(err);
    }
  });


