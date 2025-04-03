import express from 'express';
import { getTracks } from '../controllers/trackController';

const router = express.Router();

router.post('/tracks', getTracks);

export default router;
