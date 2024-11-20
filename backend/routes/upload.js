const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

// Endpoint to upload PDF
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded!' });
  }

  res.status(200).send({ message: 'File uploaded successfully!', filePath: req.file.path });
});

module.exports = router;
