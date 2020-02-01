import { Router } from 'express';

const routes = new Router();

routes.get('/clients', (req, res) => {
  return res.json({ message: 'Test' });
});

export default routes;
