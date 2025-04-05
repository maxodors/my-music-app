import express from 'express';
import { getTracks, getMetadata, getTagOptions } from '../controllers/trackController';



const router = express.Router();


router.post('/tracks', getTracks);
router.get('/columns', getMetadata);
router.get('/tags', getTagOptions); 


export default router;
