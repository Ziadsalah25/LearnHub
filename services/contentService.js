const Content = require('../models/Content');

async function createContent(contentData) {
  const newContent = new Content(contentData);
  await newContent.save();
  return newContent;
}

async function getContents(courseId) {
  return await Content.find({ course: courseId });
}

async function getContent(contentId) {
  return await Content.findById(contentId);
}

async function updateContent(contentId, updatedContent) {
  const content = await Content.findByIdAndUpdate(contentId, updatedContent, { new: true });
  return content;
}

async function deleteContent(contentId) {
  await Content.findByIdAndDelete(contentId);
}

module.exports = {
  createContent,
  getContents,
  getContent,
  updateContent,
  deleteContent
};
