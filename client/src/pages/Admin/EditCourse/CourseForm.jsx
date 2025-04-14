import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageUploader from "./ImageUploader";
import LectureList from "./LectureList";
import FormActions from "./FormActions";

const CourseForm = ({ initialData, onSubmit, loading, courseId }) => {
  const [course, setCourse] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset form when initialData changes
  useEffect(() => {
    setCourse(initialData);
    setErrors({});
    setIsSubmitted(false);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!course.name.trim()) newErrors.name = "Course name is required";
    if (!course.description.trim()) newErrors.description = "Description is required";
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      await onSubmit(course);
      setIsSubmitted(true);
      toast.success("Course updated successfully!");
      
      // Reset form to initial state (but keep the image)
      setCourse({
        ...initialData,
        image: course.image // Keep the current image
      });
    } catch (error) {
      toast.error(error.message || "Failed to update course");
    }
  };

  const resetForm = () => {
    setCourse(initialData);
    setErrors({});
    toast.info("Form reset to original values");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Course Name Field */}
      <div>
        <label className="block text-sm font-medium mb-1 text-black">
          Course Name *
        </label>
        <input
          type="text"
          name="name"
          value={course.name}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${
            errors.name ? "border-red-500" : "border-gray-300"
          } text-black`}
          placeholder="Enter course name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Level Field */}
      <div>
        <label className="block text-sm font-medium mb-1 text-black">
          Level *
        </label>
        <select
          name="level"
          value={course.level}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded text-black"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* Description Field */}
      <div>
        <label className="block text-sm font-medium mb-1 text-black">
          Description *
        </label>
        <textarea
          name="description"
          value={course.description}
          onChange={handleChange}
          rows={4}
          className={`w-full p-2 border rounded ${
            errors.description ? "border-red-500" : "border-gray-300"
          } text-black`}
          placeholder="Enter course description"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      {/* Image Uploader */}
      <ImageUploader 
        courseId={courseId}
        currentImage={course.image}
        onImageChange={(imageUrl) => setCourse(prev => ({ ...prev, image: imageUrl }))}
        uploading={uploading}
        setUploading={setUploading}
      />

      {/* Lecture List */}
      <LectureList 
        lectures={course.lectures}
        onLecturesChange={(updatedLectures) => 
          setCourse(prev => ({ ...prev, lectures: updatedLectures }))
        }
      />

      {/* Form Actions */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={resetForm}
          className="px-4 py-2 border border-gray-300 rounded text-black hover:bg-gray-50"
        >
          Reset Form
        </button>
        <div className="flex space-x-3">
          <FormActions loading={loading} />
        </div>
      </div>

      {/* Submission Status */}
      {isSubmitted && (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg">
          Course updated successfully! You can now edit again or navigate away.
        </div>
      )}
    </form>
  );
};

export default CourseForm;