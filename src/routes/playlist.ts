import express from 'express';
import { createPlaylist } from '../controllers/playlist';

const router = express.Router();

router.post('/createPlaylist', createPlaylist);

export default router;
