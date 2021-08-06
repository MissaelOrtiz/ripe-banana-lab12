import { Router } from 'express';
import Studio from '../models/Studio.js';

export default Router()
  .post('/', async (req, res, next) => {

    try {
      const studio = { name: 'Banana Studios', city: 'Portland', state: 'Oregon', country: 'US', id: 1 };

      res.send(studio);
    } catch (err) {
      next(err);
    }


  });
