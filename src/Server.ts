import express from 'express';

export default class Server {
  private readonly app;

  constructor() {
    const server = express();
    server.use(express.json());
    this.app = server;
  }

  start(port: number): Promise<void> {
    return new Promise((resolve) => {
      resolve(this.app.listen(port));
    });
  }

  addRouter(router: express.Router): Server {
    this.app.use(router);
    return this;
  }
}
