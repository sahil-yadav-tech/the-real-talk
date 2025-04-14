const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  updateLecture,
  deleteLecture,
  markAttendance,
  uploadCourseImage
} = require("../controllers/course.controller");

// Course CRUD routes
router.post("/", upload.single("image"), createCourse);
router.get("/", getCourses);
router.get("/:id", getCourseById);
router.put("/:id", updateCourse);  // For general course updates
router.delete("/:id", deleteCourse);

// Image upload route
router.post('/:id/upload-image', upload.single('image'), uploadCourseImage);

// Lecture specific routes
router.put("/:courseId/lectures/:lectureId", updateLecture);
router.delete("/:courseId/lectures/:lectureId", deleteLecture);
router.patch("/:courseId/lectures/:lectureId/attendance", markAttendance);

module.exports = router;