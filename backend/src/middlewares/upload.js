import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import CustomError from '../utils/CustomError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure tmp upload directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// File filters
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = /jpeg|jpg|png|webp/;
  const allowedCsvTypes = /csv/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (file.fieldname === 'image') {
    const isExtAllowed = allowedImageTypes.test(extname);
    const isMimeAllowed = mimetype.startsWith('image/');
    if (isExtAllowed && isMimeAllowed) {
      return cb(null, true);
    }
    return cb(new CustomError('Invalid upload: Only PNG, JPEG, and WEBP image formats are supported.', 400), false);
  }

  if (file.fieldname === 'csv') {
    const isExtAllowed = allowedCsvTypes.test(extname);
    const isMimeAllowed = mimetype === 'text/csv' || mimetype === 'application/vnd.ms-excel';
    if (isExtAllowed && isMimeAllowed) {
      return cb(null, true);
    }
    return cb(new CustomError('Invalid upload: Only CSV files are supported.', 400), false);
  }

  cb(new CustomError(`Unexpected field: ${file.fieldname}`, 400), false);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

export default upload;
