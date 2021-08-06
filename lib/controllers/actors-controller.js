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
      const kermit = { name: 'Kermit', dob: '1995-05-09T07:00:00.000Z', pob: 'Oregon' };
      const chef = { name: 'The Swedish Chef', dob: '01/01/1991', pob: 'Sweden' };
      const piggy = { name: 'Ms. Piggy', dob: '02/02/1992', pob: 'Iowa' };

      res.send([{ id: 1, ...kermit }, { id: 2, ...chef }, { id: 3, ...piggy }]);
    } catch (err) {
      next(err);
    }
  });

