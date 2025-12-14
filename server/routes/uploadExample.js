// uploadExample.js - shows how to use multer for proof images - Editor: Tomas Galea
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname,'..','uploads')),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.post('/proof', upload.single('proof'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file' });
  res.json({ filename: req.file.filename, path: `/uploads/${req.file.filename}` });
});

module.exports = router;
