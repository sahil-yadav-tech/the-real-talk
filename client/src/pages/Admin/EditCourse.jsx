import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [course, setCourse] = useState({
    name: "",
    level: "Beginner",
    description: "",
    image: "",
    lectures: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9080/api/course/${id}`
        );
        
        // Transform the lectures to handle both populated instructor objects and IDs
        const transformedCourse = {
          ...response.data,
          lectures: response.data.lectures.map(lecture => ({
            ...lecture,
            instructor: typeof lecture.instructor === 'object' 
              ? lecture.instructor._id 
              : lecture.instructor
          }))
        };
        
        setCourse(transformedCourse);
        setLoading(false);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch course");
        navigate("/admin/courses");
      }
    };
    fetchCourse();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleLectureChange = (index, field, value) => {
    setCourse((prev) => {
      const updatedLectures = [...prev.lectures];
      updatedLectures[index][field] = value;
      return { ...prev, lectures: updatedLectures };
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const response = await axios.post(
        `http://localhost:9080/api/course/${id}/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCourse((prev) => ({ ...prev, image: response.data.imageUrl }));
      toast.success("Image updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!course.name.trim()) newErrors.name = "Course name is required";
    if (!course.description.trim())
      newErrors.description = "Description is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);
      await axios.put(`http://localhost:9080/api/course/${id}`, course);
      toast.success("Course updated successfully!");
      navigate("/admin/courses");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update course");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !course.name) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-black">Edit Course</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                errors.name ? "border-red-500" : ""
              } text-black`}
              placeholder="Enter course name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Level *
            </label>
            <select
              name="level"
              value={course.level}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

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
                errors.description ? "border-red-500" : ""
              } text-black`}
              placeholder="Enter course description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Course Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="inline-block px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 text-black"
            >
              {uploading ? "Uploading..." : "Change Image"}
            </label>
            {course.image && (
              <div className="mt-2">
                <img
                  src={course.image}
                  alt="Course preview"
                  className="h-40 object-cover rounded"
                />
              </div>
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4 text-black">Lectures</h2>
            {course.lectures.map((lecture, index) => (
              <div key={index} className="border rounded p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-black">
                      Title
                    </label>
                    <input
                      type="text"
                      value={lecture.title}
                      onChange={(e) =>
                        handleLectureChange(index, "title", e.target.value)
                      }
                      className="w-full p-2 border rounded text-black"
                      placeholder="Lecture title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-black">
                      Instructor ID
                    </label>
                    <input
                      type="text"
                      value={lecture.instructor}
                      onChange={(e) =>
                        handleLectureChange(index, "instructor", e.target.value)
                      }
                      className="w-full p-2 border rounded text-black"
                      placeholder="Instructor ID"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-black">
                      Date
                    </label>
                    <input
                      type="date"
                      value={new Date(lecture.date).toISOString().split("T")[0]}
                      onChange={(e) =>
                        handleLectureChange(index, "date", e.target.value)
                      }
                      className="w-full p-2 border rounded text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-black">
                      Time
                    </label>
                    <input
                      type="time"
                      value={lecture.time}
                      onChange={(e) =>
                        handleLectureChange(index, "time", e.target.value)
                      }
                      className="w-full p-2 border rounded text-black"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/courses")}
              className="px-4 py-2 border rounded text-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-70"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;