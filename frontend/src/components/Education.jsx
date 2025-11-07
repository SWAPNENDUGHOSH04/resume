import { GraduationCap, Plus, Trash2 } from "lucide-react";
import React from "react";

const EducationForm = ({ data = [], onChange = () => {} }) => {
  const addEducation = () => {
    const newEducation = {
      school: "",
      degree: "",
      field_of_study: "",
      start_date: "",
      end_date: "",
      grade: "",
      description: "",
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <GraduationCap className="text-blue-600" />
            Education
          </h3>
          <p className="text-sm text-gray-500">
            Add your academic background here
          </p>
        </div>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-3 py-1 text-sm
          bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
        >
            <Plus className="size-4"/>
          Add Education
        </button>
      </div>

      {/* Content */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No education details added yet</p>
          <p className="text-sm">Click "Add Education" to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((edu, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-800">
                  Education #{index + 1}
                </h4>
                <button
                  className="text-red-500 hover:text-red-700 transition-colors"
                  onClick={() => removeEducation(index)}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={edu.school || ""}
                  onChange={(e) =>
                    updateEducation(index, "school", e.target.value)
                  }
                  type="text"
                  placeholder="Institution / University"
                  className="px-3 py-2 text-sm border rounded-lg"
                />
                <input
                  value={edu.degree || ""}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                  type="text"
                  placeholder="Degree"
                  className="px-3 py-2 text-sm border rounded-lg"
                />
                <input
                  value={edu.field_of_study || ""}
                  onChange={(e) =>
                    updateEducation(index, "field_of_study", e.target.value)
                  }
                  type="text"
                  placeholder="Field of Study"
                  className="px-3 py-2 text-sm border rounded-lg"
                />
                <input
                  value={edu.grade || ""}
                  onChange={(e) =>
                    updateEducation(index, "grade", e.target.value)
                  }
                  type="text"
                  placeholder="Grade / CGPA"
                  className="px-3 py-2 text-sm border rounded-lg"
                />
                <input
                  value={edu.start_date || ""}
                  onChange={(e) =>
                    updateEducation(index, "start_date", e.target.value)
                  }
                  type="month"
                  placeholder="Start Date"
                  className="px-3 py-2 text-sm border rounded-lg"
                />
                <input
                  value={edu.end_date || ""}
                  onChange={(e) =>
                    updateEducation(index, "end_date", e.target.value)
                  }
                  type="month"
                  placeholder="End Date"
                  className="px-3 py-2 text-sm border rounded-lg"
                />
              </div>

              <textarea
                value={edu.description || ""}
                onChange={(e) =>
                  updateEducation(index, "description", e.target.value)
                }
                rows={3}
                placeholder="Brief description (optional)"
                className="w-full p-3 text-sm border border-gray-300 rounded-lg resize-none focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;
