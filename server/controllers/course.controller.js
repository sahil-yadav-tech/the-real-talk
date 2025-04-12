const Course = require("../models/Course.model");
const moment = require("moment");
const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");
cloudinary.config({
  cloud_name: "dt2zvo07s",
  api_key: "963549411432585",
  api_secret: "dCEpv6ooJ_WASF59skd87afNQ7k",
});

const createCourse = async (req, res) => {
  const { name, level, description } = req.body;
  const image = req.file;

  // Parse lectures if it's a string
  let lectures = [];
  try {
    lectures =
      typeof req.body.lectures === "string"
        ? JSON.parse(req.body.lectures)
        : req.body.lectures;
  } catch (err) {
    return res.status(400).json({ message: "Invalid lectures format" });
  }

  if (!name || !level || !description || !image || !lectures) {
    return res.status(400).json({
      message:
        "All fields are required: name, level, description, image, and lectures.",
    });
  }

  if (!Array.isArray(lectures)) {
    return res.status(400).json({ message: "Lectures must be an array." });
  }

  // Validate each lecture
  for (const lecture of lectures) {
    if (
      !lecture.title ||
      !lecture.instructor ||
      !lecture.date ||
      !lecture.time
    ) {
      return res.status(400).json({
        message: "Each lecture must have a title, instructor, date, and time.",
      });
    }
  }

  try {
    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader
      .upload(image.path, {
        folder: "course_images",
        resource_type: "auto",
      })
      .catch((error) => {
        console.error("Cloudinary upload error:", error);
        throw new Error("Failed to upload image to Cloudinary");
      });

    // Check for lecture conflicts

    for (const lecture of lectures) {
      const lectureStart = moment(
        `${lecture.date} ${lecture.time}`,
        "YYYY-MM-DD HH:mm"
      );
      const lectureEnd = moment(lectureStart).add(1, "hour");

      console.log(lectureStart, lectureEnd, "Start and End ");
      console.log(lecture.instructor, lecture.date, "lecture.instructor");

      const existingCourses = await Course.find({
        "lectures.instructor": lecture.instructor,
        "lectures.date": new Date(lecture.date),
      });
      // console.log(existingCourses, "existingCourses");

      for (const course of existingCourses) {
        for (const existingLecture of course.lectures) {
          console.log(existingLecture, "finakl one");

          if (
            existingLecture.instructor.toString() === lecture.instructor &&
            moment(existingLecture.date).isSame(moment(lecture.date), "day")
          ) {
            const existingStart = moment(
              `${moment(existingLecture.date).format("YYYY-MM-DD")} ${
                existingLecture.time
              }`,
              "YYYY-MM-DD HH:mm"
            );
            const existingEnd = moment(existingStart).add(1, "hour");

            if (
              lectureStart.isBefore(existingEnd) &&
              lectureEnd.isAfter(existingStart)
            ) {
              return res.status(400).json({
                message: `Instructor already has a lecture from ${existingStart.format(
                  "hh:mm A"
                )} to ${existingEnd.format("hh:mm A")} on ${lectureStart.format(
                  "YYYY-MM-DD"
                )}`,
              });
            }
          }
        }

      }
    }

    // Prepare lectures with default attendance
    const preparedLectures = lectures.map((lecture) => ({
      ...lecture,
      date: new Date(lecture.date),
      attendanceStatus: "Not Attended",
    }));

    // Create course with all data
    const course = await Course.create({
      name,
      level,
      description,
      image: uploadResult.secure_url,
      cloudinary_id: uploadResult.public_id,
      lectures: preparedLectures,
    });

    // Delete temporary file
    fs.unlinkSync(image.path);

    return res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (err) {
    console.error("Error in createCourse:", err);
    return res.status(500).json({
      message: "Failed to create course",
      error: err.message,
    });
  }
};

const getCourses = async (req, res) => {
  try {
    const { search, page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { level: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const courses = await Course.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('lectures.instructor', 'name email');

    const totalCourses = await Course.countDocuments(query);
    const totalPages = Math.ceil(totalCourses / limit);

    return res.status(200).json({
      courses,
      totalPages,
      currentPage: parseInt(page),
      totalCourses
    });
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch courses", err });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "lectures.instructor",
      "name email"
    );
    if (!course) return res.status(404).json({ message: "Course not found" });
    return res.status(200).json(course);
  } catch (err) {
    return res.status(500).json({ message: "Error getting course", err });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!course) return res.status(404).json({ message: "Course not found" });
    return res.status(200).json({ message: "Course updated", course });
  } catch (err) {
    return res.status(500).json({ message: "Error updating course", err });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    return res.status(200).json({ message: "Course deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting course", err });
  }
};

const updateLecture = async (req, res) => {
  const { courseId, lectureId } = req.params;
  const { title, date, time, instructor } = req.body;

  if (!title || !date || !time || !instructor) {
    return res.status(400).json({
      message: "All fields are required: title, date, time, instructor",
    });
  }

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const lecture = course.lectures.id(lectureId);
    if (!lecture) return res.status(404).json({ message: "Lecture not found" });

    lecture.title = title;
    lecture.date = date;
    lecture.time = time;
    lecture.instructor = instructor;

    await course.save();
    return res.status(200).json({ message: "Lecture updated", lecture });
  } catch (err) {
    return res.status(500).json({ message: "Error updating lecture", err });
  }
};

const deleteLecture = async (req, res) => {
  const { courseId, lectureId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.lectures.id(lectureId).remove();
    await course.save();

    return res.status(200).json({ message: "Lecture deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting lecture", err });
  }
};

// ✅ Mark Attendance
const markAttendance = async (req, res) => {
  const { courseId, lectureId } = req.params;
  const { status } = req.body;

  if (!["Attended", "Not Attended"].includes(status)) {
    return res.status(400).json({ message: "Invalid attendance status" });
  }

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const lecture = course.lectures.id(lectureId);
    if (!lecture) return res.status(404).json({ message: "Lecture not found" });

    lecture.attendanceStatus = status;
    await course.save();

    return res.status(200).json({ message: "Attendance updated", lecture });
  } catch (err) {
    return res.status(500).json({ message: "Error updating attendance", err });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  updateLecture,
  deleteLecture,
  markAttendance,
};
