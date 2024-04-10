import { Request, Response } from 'express';
import { google } from 'googleapis';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const drive = google.drive('v3');

// Cấu hình Multer để lưu trữ ảnh tạm thời trước khi tải lên
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Đường dẫn đến tệp tin chứa thông tin xác thực của Google API
const credentialsPath = '../key.json';

// Đọc thông tin xác thực từ tệp tin
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

// Tạo JWT client để xác thực với Google Drive API
const auth: any = new google.auth.JWT(
  credentials.client_email,
  '',
  credentials.private_key,
  ['https://www.googleapis.com/auth/drive']
);

export const uploadImages = async (req: Request, res: Response) => {
  try {
    const images = req.files as Express.Multer.File[];
    const folderId = 'YOUR_FOLDER_ID'; // ID của thư mục bạn muốn lưu ảnh vào
    const promises = images.map(async (image) => {
      const fileMetadata: any = {
        requestBody: {
          name: image.originalname,
          parents: [folderId]
        }
      };
      
      const media = {
        mimeType: image.mimetype,
        body: fs.createReadStream(image.path)
      };
      
      await drive.files.create({
        auth: auth,
        requestBody: fileMetadata,
        media: media,
        fields: 'id'
      });
    });
    await Promise.all(promises);
    res.status(200).json({ message: 'Upload successful' });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ message: 'Upload failed' });
  }
};
