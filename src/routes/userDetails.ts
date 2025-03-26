import express from 'express';
import { getUserDetails } from '../controllers/userDetails';

const router = express.Router();

router.get('/userDetails', getUserDetails);

export default router;
