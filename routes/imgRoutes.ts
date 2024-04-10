import express from 'express';
import { uploadImages } from '../controllers/imgController';
import multer from 'multer';

const router = express.Router();

// Route để upload ảnh
router.post('/upload', multer().array('images', 10), uploadImages);

export default router;
