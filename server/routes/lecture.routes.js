const express = require('express');
const { verifyUser, requireRole } = require('../middleware/authMiddleware');
const lecture = require('../models/lecture');
const router = express.Router();

// Admin only: schedule a lecture
router.post('/', verifyUser, requireRole('admin'), async (req, res) => {
  const lecture = new lecture(req.body);
  await lecture.save();
  res.json(lecture);
});

// Instructor: view assigned lectures
router.get('/my', verifyUser, requireRole('instructor'), async (req, res) => {
  const lectures = await Lecture.find({ instructor: req.user._id }).populate('course');
  res.json(lectures);
});

module.exports = router;
