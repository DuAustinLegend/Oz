const express = require('express');
const fs = require('fs');
const path = require('path');
const pdfParser = require('../utils/pdfParser');

const router = express.Router();

// Utility to parse all PDFs in the uploads folder
const parseAllPDFs = async () => {
  const uploadDir = path.join(__dirname, '../uploads');
  const files = fs.readdirSync(uploadDir).filter(file => file.endsWith('.pdf'));

  let allContent = '';
  for (const file of files) {
    const filePath = path.join(uploadDir, file);
    const content = await pdfParser(filePath);
    allContent += `\n---\nContent from ${file}:\n${content}`;
  }

  return allContent;
};

// Chat endpoint
router.post('/:botName', async (req, res) => {
  const { botName } = req.params;
  const { query } = req.body;

  const validBotNames = ['mimi', 'austin']; // Allowed chatbot names
  if (!validBotNames.includes(botName.toLowerCase())) {
    return res.status(400).send({ error: 'Invalid chatbot name. Use "mimi" or "austin".' });
  }

  if (!query) {
    return res.status(400).send({ error: 'Query is required!' });
  }

  try {
    const allContent = await parseAllPDFs();
    const response = botName.toLowerCase() === 'mimi'
      ? `Mimi: You asked "${query}". Here's a response based on the books:\n\n${allContent.slice(0, 500)}...`
      : `Austin: You asked "${query}". Here's a response based on the books:\n\n${allContent.slice(0, 500)}...`;

    res.send({ response });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error processing chatbot response.' });
  }
});

module.exports = router;





