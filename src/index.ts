import { createConnection } from 'typeorm';
import { Router } from 'express';
import Server from './Server';
import { guardRouter, authRouter } from './routes';
import { checkAuth } from './infra/middlewares/checkAuth';

require('dotenv').config();

const initDatabaseConnection = async (): Promise<void> => {
  await createConnection();
};

initDatabaseConnection()
  .then(() => {
    const server = new Server();
    const baseRouter = Router();
    baseRouter.use('/api', authRouter, guardRouter.use(checkAuth));
    server.addRouter(baseRouter);
    server
      .start(3000)
      .then(() => console.log('Started'))
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(`Error has occur ${err}`));
