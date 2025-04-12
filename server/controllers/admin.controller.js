const User = require("../models/User.model");

// 1. Get all instructors
const getAllInstructors = async (req, res) => {
  try {
    const instructors = await User.find({ role: "instructor" }).select(
      "name email role _id"
    );

    if (!instructors || instructors.length === 0) {
      return res.status(404).json({ message: "No instructors found" });
    }

    return res.status(200).json({
      message: "Instructors fetched successfully",
      instructors,
    });
  } catch (err) {
    console.error("Error fetching instructors:", err);
    return res
      .status(500)
      .json({ message: "Server error while fetching instructors" });
  }
};

// Add this new function to your controller
const getInstructorById = async (req, res) => {
  try {
    const instructor = await User.findOne({
      _id: req.params.id,
      role: "instructor",
    }).select("name email role _id");

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    return res.status(200).json({ instructor });
  } catch (err) {
    console.error("Error fetching instructor:", err);
    return res
      .status(500)
      .json({ message: "Server error while fetching instructor" });
  }
};

// 2. Add a new instructor
const createInstructor = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email already exists
    const existingInstructor = await User.findOne({ email });
    if (existingInstructor) {
      return res
        .status(400)
        .json({ message: "Instructor with this email already exists" });
    }

    // Create new instructor
    const newInstructor = await User.create({
      name,
      email,
      password,
      role: "instructor",
    });

    return res.status(201).json({
      message: "Instructor created successfully",
      instructor: {
        _id: newInstructor._id,
        name: newInstructor.name,
        email: newInstructor.email,
        role: newInstructor.role,
      },
    });
  } catch (err) {
    console.error("Error creating instructor:", err);
    return res
      .status(500)
      .json({ message: "Server error while creating instructor" });
  }
};

// 3. Edit instructor details
const editInstructor = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  console.log(name, "ahahahaahahah");

  try {
    const instructor = await User.findById(id);

    if (!instructor || instructor.role !== "instructor") {
      return res.status(404).json({ message: "Instructor not found" });
    }

    // Update instructor details
    instructor.name = name || instructor.name;
    instructor.email = email || instructor.email;

    await instructor.save();

    return res.status(200).json({
      message: "Instructor updated successfully",
      instructor: {
        _id: instructor._id,
        name: instructor.name,
        email: instructor.email,
        role: instructor.role,
      },
    });
  } catch (err) {
    console.error("Error updating instructor:", err);
    return res
      .status(500)
      .json({ message: "Server error while updating instructor" });
  }
};

// 4. Delete instructor
const deleteInstructor = async (req, res) => {
  const { id } = req.params;

  try {
    const instructor = await User.findOneAndDelete({
      _id: id,
      role: "instructor",
    });

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    return res.status(200).json({
      message: "Instructor deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting instructor:", err);
    return res
      .status(500)
      .json({ message: "Server error while deleting instructor" });
  }
};

// Then add it to your exports:
module.exports = {
  getAllInstructors,
  getInstructorById,
  createInstructor,
  editInstructor,
  deleteInstructor,
};
