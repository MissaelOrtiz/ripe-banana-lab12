import { Router } from 'express';
import Film from '../models/Film.js';
import Review from '../models/Review.js';
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
      const reviewer = await Reviewer.findByPk(req.params.id, {
        attributes: ['id', 'name', 'company'],
        include: [{ model: Review, attributes:['id', 'rating', 'review'], include:[{ model: Film, attributes:['id', 'title'] }] }]
      });

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
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const reviewer = await Reviewer.findByPk(req.params.id, {
        attributes: ['id', 'name', 'company'],
        include: [{ model: Review, attributes:['id', 'rating', 'review'], include:[{ model: Film, attributes:['id', 'title'] }] }]
      });
      

      if(reviewer.toJSON().Reviews.length > 0) {
        
        res.send({ success: false });
      }
      await Reviewer.destroy({
        where: { id: req.params.id }
      });
      res.send({ success: true });
    } catch (err) {
      next(err);
    }
  });

