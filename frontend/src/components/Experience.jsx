import { Briefcase, GraduationCap, Plus, Trash2 } from 'lucide-react';
import React from 'react';

const Experience = ({ data = [], onChange = () => {} }) => {
  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
            <Briefcase className='text-blue-600'/>
            Experience

          </h3>
          <p className='text-sm text-gray-500'>Add your Work Experience here</p>
        </div>
        <button
          onClick={addExperience}
          className='flex items-center gap-2 px-3 py-1 text-sm
          bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors'
        >
            <Plus className='size-4'/>
          Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className='text-center py-8 text-gray-500'>
          <Briefcase className='w-12 h-12 mx-auto mb-3 text-gray-300' />
          <p>No work experience added yet</p>
          <p className='text-sm'>Click "Add Experience" to get started</p>
        </div>
      ) : (
        <div className='space-y-4'>
          {data.map((experience, index) => (
            <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>
              <div className='flex justify-between items-start'>
                <h4>Experience #{index + 1}</h4>
                <button
                  className='text-red-500 hover:text-red-700 transition-colors'
                  onClick={() => removeExperience(index)}
                >
                  <Trash2 className='size-4' />
                </button>
              </div>

              <div className='grid md:grid-cols-2 gap-3'>
                <input
                  value={experience.company || ""}
                  onChange={(e) => updateExperience(index, "company", e.target.value)}
                  type='text'
                  placeholder='Company name'
                  className='px-3 py-2 text-sm border rounded-lg'
                />
                <input
                  value={experience.position || ""}
                  onChange={(e) => updateExperience(index, "position", e.target.value)}
                  type='text'
                  placeholder='Job Title'
                  className='px-3 py-2 text-sm border rounded-lg'
                />
                <input
                  value={experience.start_date || ""}
                  onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                  type='month'
                  placeholder='Date of Joining'
                  disabled={experience.is_current}
                  className='px-3 py-2 text-sm border rounded-lg disabled:bg-gray-100'
                />
                <input
                  value={experience.end_date || ""}
                  onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                  type='month'
                  placeholder='Ending Date'
                  className='px-3 py-2 text-sm border rounded-lg'
                />
                <input
                  value={experience.description || ""}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                  type='text'
                  placeholder='Describe your job role'
                  className='px-3 py-2 text-sm border rounded-lg'
                />
              </div>

              <label className='flex items-center gap-2 text-sm text-gray-700'>
                <input
                  type='checkbox'
                  className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                  checked={experience.is_current || false}
                  onChange={(e) =>
                    updateExperience(index, "is_current", e.target.checked)
                  }
                />
                Currently working here
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Experience;
