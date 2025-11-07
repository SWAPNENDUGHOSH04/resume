import { PlayCircle, Plus, Sparkles, SparklesIcon, Trash2, X } from "lucide-react";
import React from "react";
import { useState } from "react";

const SkillsForm = ({ data, onChange }) => {
    const [newSkill , setNewSkill] = useState("")
    const addSkill = () => {
        if(newSkill.trim() && !data.includes(newSkill.trim())){
        onChange([...data, newSkill.trim()])
        setNewSkill("")
        }
  }

  const removeSkill = (indexToRemove) => {
    onChange(data.filter((_,index)=>index !==indexToRemove))
  }

  const handleKeyPress=(e)=>{
    if(e.key === "Enter"){
        e.preventDefault();
        addSkill();
    }
  }

  //const updateSkill = (index, field, value) => {
   // const updated = [...data];
//    updated[index] = { ...updated[index], [field]: value };
  //  onChange(updated);
 // };

  return (
    <div className="space-y-4">
      <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Sparkles className="text-blue-600" />
            Skills
          </h3>
          <p className="text-sm text-gray-500">
            Add your professional or technical skills here
          </p>
        </div>
        <div className="flex gap-2">
            <input  onChange={(e)=>setNewSkill(e.target.value)}
          value={newSkill}
          onKeyDown={handleKeyPress}
          type="text" placeholder="enter a skill" className="
            flex-1 px-3 py-2 text-sm"/>
        <button
            onClick={addSkill} disabled={!newSkill.trim()}
          className="flex items-center gap-2 px-4 py-2 text-sm
          bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <Plus className="size-4"/>
          Add Skill
        </button>
      </div>
      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2">
            {data.map((skill,index)=>(
                <span key={index} className="flex items-center gap-1 px-3 py-1
                bg-blue-100 text-blue-800 rounded-full text-sm">
                    {skill}
                    <button
                    onClick={()=>removeSkill(index)} 
                    className="ml-1 hover:bg-blue-20'0 rounded-full p-0.5 transition-colors">
                        <X className="w-3 h-3"/>
                    </button>
                </span>
            ))}
        </div>
      ):(
        <div className="text-center py-6 text-gray-500">
            <p>No Skills added</p>
            <p className="text-sm">Add your tech and soft skills above</p>
        </div>
      )}
      <div>
        <p className="text-sm text-blue-800"></p>
      </div>
      </div>

    
  );
};

export default SkillsForm;
