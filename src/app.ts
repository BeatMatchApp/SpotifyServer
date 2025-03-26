import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import BaseRouter from './routes/index';

dotenv.config();

const createServer = async (): Promise<Express> => {
  try {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use('/api', BaseRouter);

    return app;
  } catch (error) {
    throw new Error(`Error initializing app: ${error.message}`);
  }
};

export default createServer;
