// import dotenv from 'dotenv';
// dotenv.config();
// import express from 'express'
// import multer  from 'multer'
// import multerS3 from 'multer-s3'
// import { S3Client } from '@aws-sdk/client-s3'

// const app = express();
// const port = process.env.PORT || 3000;

// // Configure AWS SDK
// const s3 = new S3Client({ 
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//   }
// });

// // Configure multer to use S3 for storage
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.S3_BUCKET_NAME,
//     key: function (req, file, cb) {
//       cb(null, `resumes/${Date.now()}_${file.originalname}`);
//     }
//   })
// });

// // Endpoint to handle resume uploads
// app.post('/upload', upload.single('resume'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send({ error: 'Please upload a file' });
//   }
//   res.send({ message: 'File uploaded successfully', fileUrl: req.file.location });
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


// index.js
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import careerRoutes from './routes/career.routes.js';
import connectDB from './config/db.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use career routes
app.use('/api/career', careerRoutes); 

app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
