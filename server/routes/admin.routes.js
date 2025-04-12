const express = require("express");
const router = express.Router();
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  updateLecture,
  deleteLecture,
} = require("../controllers/course.controller");

const { getAllInstructors, createInstructor, editInstructor, deleteInstructor, getInstructorById } = require("../controllers/admin.controller");

// Instructors route should come first
router.get("/instructors", getAllInstructors);
router.get("/instructors/:id", getInstructorById);
router.post("/instructors", createInstructor);
router.put("/instructors/:id", editInstructor);
router.delete("/instructors/:id", deleteInstructor);

// Course Routes
router.post("/", createCourse);
router.get("/", getCourses);
router.get("/:id", getCourseById);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

// Lectures routes
router.put("/:courseId/lecture/:lectureId", updateLecture);
router.delete("/:courseId/lecture/:lectureId", deleteLecture);

module.exports = router;
