import { Router } from 'express';
import Reviewer from '../models/Reviewer.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const reviewer = { id: 1, name: 'Dick Johnson', company: 'Banana Reviews' };

      res.send(reviewer);
    } catch (err) {
      next(err);
    }
  });

