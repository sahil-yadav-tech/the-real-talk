import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CourseForm from "./CourseForm";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({
    name: "",
    level: "Beginner",
    description: "",
    image: "",
    lectures: [],
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9080/api/course/${id}`
        );
        
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

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:9080/api/course/${id}`, formData);
      toast.success("Course updated successfully!");
      // navigate("/admin/courses");
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
        <CourseForm 
          initialData={course} 
          onSubmit={handleSubmit} 
          loading={loading}
          courseId={id} 
        />
      </div>
    </div>
  );
};

export default EditCourse;