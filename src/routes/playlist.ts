import express from 'express';
import { addSong, createPlaylist } from '../controllers/playlist';

const router = express.Router();

router.post('/createPlaylist', createPlaylist);
router.post('/addSong', addSong);

export default router;
