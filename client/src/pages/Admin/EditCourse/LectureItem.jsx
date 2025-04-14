import React from "react";

const LectureItem = ({ index, lecture, onChange }) => {
  return (
    <div className="border rounded p-4 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Title
          </label>
          <input
            type="text"
            value={lecture.title}
            onChange={(e) => onChange(index, "title", e.target.value)}
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
            onChange={(e) => onChange(index, "instructor", e.target.value)}
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
            onChange={(e) => onChange(index, "date", e.target.value)}
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
            onChange={(e) => onChange(index, "time", e.target.value)}
            className="w-full p-2 border rounded text-black"
          />
        </div>
      </div>
    </div>
  );
};

export default LectureItem;