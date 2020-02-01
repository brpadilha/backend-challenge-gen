import { Router } from 'express';

import ClientController from './app/Controllers/ClientController';
import SessionController from './app/Controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/clients', ClientController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/clients', (req, res) => {
  res.json({ error: 'You passed' });
});

export default routes;
