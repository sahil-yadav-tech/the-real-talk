import React from "react";
import { useNavigate } from "react-router-dom";

const FormActions = ({ loading }) => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default FormActions;