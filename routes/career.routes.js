import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { createCareer } from '../controller/career.controller.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Configure AWS SDK
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Configure multer to use S3 for storage
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, `resumes/${Date.now()}_${file.originalname}`);
    },
  }),
});

// Route to handle resume uploads and career creation
router.post('/create', upload.single('resume'), createCareer);

// Export the router as default
export default router;
