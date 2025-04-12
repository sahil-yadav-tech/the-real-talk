// models/Course.model.js
const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  attendanceStatus: {
    type: String,
    enum: ["Attended", "Not Attended"],
    default: "Not Attended",
  },
});

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  lectures: [LectureSchema],
});

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
