// models/Career.js
import mongoose from 'mongoose';

const CareerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true, 
  },
  date: {
    type: Date,
    default: Date.now,
  },
  resumeUrl: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Career', CareerSchema);