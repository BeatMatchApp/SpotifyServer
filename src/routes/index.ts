import { Router } from 'express';
import geminiRoute from './spotifyLogin';

const baseRouter = Router();

baseRouter.use('/spotifyAPI', geminiRoute);

export default baseRouter;
