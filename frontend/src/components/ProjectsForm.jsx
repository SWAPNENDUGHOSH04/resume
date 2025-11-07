import { FolderCode, Plus, Trash2 } from "lucide-react";
import React from "react";

const ProjectsForm = ({ data = [], onChange = () => {} }) => {
  const addProject = () => {
    const newProject = {
      title: "",
      role: "",
      technologies: "",
      start_date: "",
      end_date: "",
      link: "",
      description: "",
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
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
            <FolderCode className="text-blue-600" />
            Projects
          </h3>
          <p className="text-sm text-gray-500">
            Showcase your personal or professional projects
          </p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm
          bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
        >
            <Plus className="size-4"/>
          Add Project
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FolderCode className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No projects added yet</p>
          <p className="text-sm">Click "Add Project" to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-800">
                  Project #{index + 1}
                </h4>
                <button
                  className="text-red-500 hover:text-red-700 transition-colors"
                  onClick={() => removeProject(index)}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={project.title || ""}
                  onChange={(e) =>
                    updateProject(index, "title", e.target.value)
                  }
                  type="text"
                  placeholder="Project Title"
                  className="px-3 py-2 text-sm border rounded-lg"
                />
                <input
                  value={project.role || ""}
                  onChange={(e) => updateProject(index, "role", e.target.value)}
                  type="text"
                  placeholder="Your Role (e.g., Frontend Developer)"
                  className="px-3 py-2 text-sm border rounded-lg"
                />
                <input
                  value={project.technologies || ""}
                  onChange={(e) =>
                    updateProject(index, "technologies", e.target.value)
                  }
                  type="text"
                  placeholder="Technologies Used (e.g., React, Node.js)"
                  className="px-3 py-2 text-sm border rounded-lg"
                />
                <input
                  value={project.link || ""}
                  onChange={(e) => updateProject(index, "link", e.target.value)}
                  type="url"
                  placeholder="Project Link (optional)"
                  className="px-3 py-2 text-sm border rounded-lg"
                />
                <input
                  value={project.start_date || ""}
                  onChange={(e) =>
                    updateProject(index, "start_date", e.target.value)
                  }
                  type="month"
                  placeholder="Start Date"
                  className="px-3 py-2 text-sm border rounded-lg"
                />
                <input
                  value={project.end_date || ""}
                  onChange={(e) =>
                    updateProject(index, "end_date", e.target.value)
                  }
                  type="month"
                  placeholder="End Date"
                  className="px-3 py-2 text-sm border rounded-lg"
                />
              </div>

              <textarea
                value={project.description || ""}
                onChange={(e) =>
                  updateProject(index, "description", e.target.value)
                }
                rows={3}
                placeholder="Describe your project, challenges, and outcomes"
                className="w-full p-3 text-sm border border-gray-300 rounded-lg resize-none focus:ring focus:ring-purple-300 focus:border-purple-500 outline-none transition-colors"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;
