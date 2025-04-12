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
} = require("../controllers/course.controller");

router.post("/", upload.single("image"), createCourse);
router.get("/", getCourses);
router.get("/:id", getCourseById);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

router.put("/:courseId/lectures/:lectureId", updateLecture);
router.delete("/:courseId/lectures/:lectureId", deleteLecture);
router.patch("/:courseId/lectures/:lectureId/attendance", markAttendance);

module.exports = router;
