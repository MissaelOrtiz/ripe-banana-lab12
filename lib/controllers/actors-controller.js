import { Router } from 'express';
import Actor from '../models/Actor.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const actor = { id: 1, name: 'Kermit', dob: '05/09/1995', pob: 'Oregon' };

      res.send(actor);
    } catch (err) {
      next(err);
    }
  });

