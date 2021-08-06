import { Router } from 'express';
import Review from '../models/Review.js';

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
      const reviews = await Review.findAll();

      res.send(reviews);
    } catch (err) {
      next(err);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const review =  {  id: 1, rating: 5, reviewer: '1', review: 'It good', film: '1' };

      res.send(review);
    } catch (err) {
      next(err);
    }
  });


