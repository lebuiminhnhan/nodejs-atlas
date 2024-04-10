import express from 'express';
import { uploadImages, upload, checkFileExists  } from '../controllers/imgController';

const router = express.Router();
/**
 * @swagger
 * /files:
 *   post:
 *     summary: Upload images to Google Drive
 *     description: Upload multiple images to Google Drive
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       '200':
 *         description: Images uploaded successfully
 *       '500':
 *         description: Failed to upload images
 */
router.post('/', upload.array('images', 10), uploadImages);
/**
 * @swagger
 * /files/{fileId}:
 *   get:
 *     summary: Kiểm tra sự tồn tại của một file trên Google Drive bằng fileId
 *     parameters:
 *       - in: path
 *         name: fileId
 *         required: true
 *         description: ID của file cần kiểm tra
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: File tồn tại trên Google Drive
 *       '404':
 *         description: File không tồn tại trên Google Drive
 *       '500':
 *         description: Lỗi server nội bộ
 */
router.post('/:id', checkFileExists);

export default router;
