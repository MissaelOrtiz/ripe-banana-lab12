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
      const reviewer =  await Reviewer.update(req.body, {
        where: { id: req.params.id },
        returning: true
      });

      res.send(reviewer[1][0]);
    } catch (err) {
      next(err);
    }
  });

