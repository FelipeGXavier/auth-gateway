import { createConnection } from 'typeorm';
import Server from './Server';
import { userRouter, authRouter } from './routes';

require('dotenv').config();

const initDatabaseConnection = async (): Promise<void> => {
  await createConnection();
};

initDatabaseConnection()
  .then(() => {
    const server = new Server();
    server.addRouter(userRouter);
    server.addRouter(authRouter);
    server
      .start(3000)
      .then(() => console.log('Started'))
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(`Error has occur ${err}`));
