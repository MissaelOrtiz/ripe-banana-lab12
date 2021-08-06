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
      const reivewers = await Reviewer.findAll();

      res.send(reivewers);
    } catch (err) {
      next(err);
    }
  })
  
  .patch('/:id', async (req, res, next) => {
    try {
      const reviewer =  { id: 1, name: 'Richard Johnson', company: 'Banana Reviews' };

      res.send(reviewer);
    } catch (err) {
      next(err);
    }
  });

