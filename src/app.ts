import cors from 'cors';
import express, { Express } from 'express';
import BaseRouter from './routes/index';
import { callback } from './controllers/login';

const createServer = async (): Promise<Express> => {
  try {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use('/callback', callback);
    app.use('/spotifyAPI', BaseRouter);

    return app;
  } catch (error) {
    throw new Error(`Error initializing app: ${error.message}`);
  }
};

export default createServer;
