const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.js'); // Optional for auth middleware

const { createContent, getContents } = require('../services/contentService');

// Route for instructors to create content for their courses
router.post('/courses/:courseId/content', auth, async (req, res) => {
  if (req.user.role !== 'instructor') {
    return res.status(403).json({ message: 'Unauthorized access' });
  }

  const courseId = req.params.courseId;
  const contentData = req.body; // Adjust based on content data structure
  contentData.course = courseId;

  try {
    const content = await createContent(contentData);
    res.status(201).json(content);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to get all content for a specific course
router.get('/courses/:courseId/content', async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const contents = await getContents(courseId);
    res.status(200).json(contents);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

//we will create simillar for ubdate ,delete ,search and filtring
//
module.exports = router;
