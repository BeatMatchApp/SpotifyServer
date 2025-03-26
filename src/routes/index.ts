import { Router } from 'express';
import loginRoute from './login';
import userRoute from './/userDetails';
import playlistRoute from './playlist';

const baseRouter = Router();

baseRouter.use('/', loginRoute);
baseRouter.use('/users', userRoute);
baseRouter.use('/playlists', playlistRoute);

export default baseRouter;
