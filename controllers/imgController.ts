import { Request, Response } from 'express';
import { google } from 'googleapis';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const drive = google.drive('v3');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
export const upload = multer({ storage: storage });

const credentialsPath = 'credentials.json';
if (fs.existsSync(credentialsPath)) {
  console.log('File exists');
} else {
  console.log('File does not exist');
}

const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

const auth: any = new google.auth.JWT(
  credentials.client_email,
  '',
  credentials.private_key,
  ['https://www.googleapis.com/auth/drive']
);

export const uploadImages = async (req: Request, res: Response) => {
  try {
    console.log(req.files);
    const images = req.files as Express.Multer.File[];
    const folderId = '1eMUCt_nnHS2frA0_krFCbTg_SJWISuel';
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
      
      console.log('Creating file:', image.originalname);

      const uploadedFile = await drive.files.create({
        auth: auth,
        requestBody: fileMetadata,
        media: media,
        fields: 'id'
      });

      console.log('File created:', uploadedFile.data);

      try {
        fs.unlinkSync(image.path);
      } catch (error) {
        console.error('Error deleting file:', error);
        throw new Error('Failed to delete uploaded file');
      }
    });
    await Promise.all(promises);
    res.status(200).json({ message: 'Upload successful' });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ message: 'Upload failed' });
  }
};


export const checkFileExists =async (req: Request, res: Response) => {
  const fileId = req.params.id;
  try {
    const response = await drive.files.get({
      auth: auth,
      fileId: fileId,
      fields: 'id, name'
    });
    
    console.log('File exists:', response.data.name);
    return true;
  } catch (error) {
    console.log('File does not exist:', error);
    return false;
  }
};