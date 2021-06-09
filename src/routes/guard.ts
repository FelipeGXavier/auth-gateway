import { Router } from 'express';
import { checkAuth } from '../infra/middlewares/checkAuth';

export const guardRouter = Router();

guardRouter.use(checkAuth).get('/guard', (req, res) => {
  console.log(req.permission);
  return res.sendStatus(200);
});
