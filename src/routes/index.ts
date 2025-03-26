import { Router } from 'express';
import loginRoute from './spotifyLogin';
import playlistRoute from './playlist';

const baseRouter = Router();

baseRouter.use('/', loginRoute);
baseRouter.use('/playlists', playlistRoute);

export default baseRouter;
