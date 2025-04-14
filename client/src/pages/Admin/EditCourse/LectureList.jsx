import React from "react";
import LectureItem from "./LectureItem";

const LectureList = ({ lectures, onLecturesChange }) => {
  const handleLectureChange = (index, field, value) => {
    const updatedLectures = [...lectures];
    updatedLectures[index][field] = value;
    onLecturesChange(updatedLectures);
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4 text-black">Lectures</h2>
      {lectures.map((lecture, index) => (
        <LectureItem
          key={index}
          index={index}
          lecture={lecture}
          onChange={handleLectureChange}
        />
      ))}
    </div>
  );
};

export default LectureList;