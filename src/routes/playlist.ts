import express from 'express';
import { addSong, createPlaylist, searchSong } from '../controllers/playlist';

const router = express.Router();

router.post('/createPlaylist', createPlaylist);
router.post('/addSong', addSong);
router.post('./searchSong', searchSong);

export default router;
