const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.js'); // Optional for auth middleware

const { getContent, updateContent, deleteContent } = require('../services/contentService');

// Route to get a specific content piece
router.get('/:contentId', async (req, res) => {
  const contentId = req.params.contentId; // Corrected line

  try {
    const content = await getContent(contentId);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json(content);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
