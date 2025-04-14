import React from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ImageUploader = ({ courseId, currentImage, onImageChange, uploading, setUploading }) => {
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const response = await axios.post(
        `http://localhost:9080/api/course/${courseId}/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onImageChange(response.data.imageUrl);
      toast.success("Image updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
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
      {currentImage && (
        <div className="mt-2">
          <img
            src={currentImage}
            alt="Course preview"
            className="h-40 object-cover rounded"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;