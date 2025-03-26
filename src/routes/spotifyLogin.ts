import express from 'express';
import { callback, login } from '../controllers/login';
import { getUserDetails } from '../controllers/userDetails';

const router = express.Router();

router.get('/login', login);
router.get('/callback', callback);
router.get('/userDetails', getUserDetails);

export default router;
