import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as htmlToImage from 'html-to-image'
import {
  Palette,
  FileText,
  Briefcase,
  GraduationCap,
  Sparkles,
  Layout,
  Download,
  Plus,
} from "lucide-react";
import { dummyResumeData } from "../assets/assets";

const Resume = () => {
  const previewRef = useRef(null);
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: { name: "", email: "", phone: "", address: "" },
    professional_summary: "",
    experience: [{ title: "", company: "", years: "" }],
    education: [{ degree: "", institution: "", year: "" }],
    project:[{title: "", description:"", duration:""}],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
  });
  const [showPreview,setShowPreview] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [accentColor, setAccentColor] = useState("#3B82F6");

  const accentColors = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
    "#06B6D4",
  ];

  useEffect(() => {
    const resume = dummyResumeData.find((r) => r._id === resumeId);
    if (resume) setResumeData(resume);
  }, [resumeId]);

  const handleChange = (section, field, value, index = null) => {
    if (index !== null) {
      const updated = [...resumeData[section]];
      updated[index][field] = value;
      setResumeData({ ...resumeData, [section]: updated });
    } else {
      setResumeData({
        ...resumeData,
        [section]: { ...resumeData[section], [field]: value },
      });
    }
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, { title: "", company: "", years: "" }],
    });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, { degree: "", institution: "", year: "" }],
    });
  };

  const addSkill = (skill) => {
    if (skill.trim() !== "") {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, skill],
      });
    }
  };

  const handleDownloadPDF = async () => {
    
    
    if (!previewRef.current){
    console.error("preview element not found")
    return;
  }
    if(!document.body.contains(previewRef.current)){
      console.error("Preview element not In DOM")
      return;
    }

  try {
    await new Promise((r) => setTimeout(r,100))
    const dataUrl = await htmlToImage.toPng(previewRef.current, {
      cacheBust: true,
      backgroundColor: "#ffffff",
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(dataUrl)
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${document.title || "resume"}.pdf`);
  } catch (error) {
    console.error("PDF generation failed:", error);
  }
};


  // Templates
  const renderTemplate = () => {
    const { personal_info, professional_summary, experience, education, skills } =
      resumeData;

    if (selectedTemplate === "classic") {
      return (
        <div
          className="bg-white rounded-lg shadow p-8 border-t-8"
          style={{ borderColor: accentColor }}
        >
          <h1 className="text-3xl font-bold text-gray-900">
            {personal_info.name || "Your Name"}
          </h1>
          <p className="text-gray-600 text-sm">
            {personal_info.email} | {personal_info.phone} | {personal_info.address}
          </p>

          <Section title="Summary" accent={accentColor}>
            <p>{professional_summary}</p>
          </Section>

          <Section title="Experience" accent={accentColor}>
            {experience.map((exp, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold">{exp.title}</p>
                <p className="text-sm text-gray-600">
                  {exp.company} — {exp.years}
                </p>
              </div>
            ))}
          </Section>

          <Section title="Education" accent={accentColor}>
            {education.map((edu, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold">{edu.degree}</p>
                <p className="text-sm text-gray-600">
                  {edu.institution} ({edu.year})
                </p>
              </div>
            ))}
          </Section>

          <Section title="Skills" accent={accentColor}>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span
                  key={i}
                  className="bg-gray-100 border border-gray-300 px-2 py-1 rounded text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </Section>
        </div>
      );
    }

    // Modern Template
    return (
      <div className="bg-gray-50 rounded-lg shadow p-10">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {personal_info.name || "Your Name"}
            </h1>
            <p className="text-gray-600">
              {personal_info.email} | {personal_info.phone}
            </p>
          </div>
          <p className="text-gray-600 text-sm">{personal_info.address}</p>
        </div>

        <h2 className="text-xl font-semibold mb-2" style={{ color: accentColor }}>
          Summary
        </h2>
        <p className="text-gray-700 mb-4">{professional_summary}</p>

        <h2 className="text-xl font-semibold mb-2" style={{ color: accentColor }}>
          Experience
        </h2>
        {experience.map((exp, i) => (
          <div key={i} className="mb-2">
            <p className="font-semibold">{exp.title}</p>
            <p className="text-sm text-gray-600">
              {exp.company} — {exp.years}
            </p>
          </div>
        ))}

        <h2 className="text-xl font-semibold mt-4 mb-2" style={{ color: accentColor }}>
          Education
        </h2>
        {education.map((edu, i) => (
          <div key={i} className="mb-2">
            <p className="font-semibold">{edu.degree}</p>
            <p className="text-sm text-gray-600">
              {edu.institution} ({edu.year})
            </p>
          </div>
        ))}

        <h2 className="text-xl font-semibold mt-4 mb-2" style={{ color: accentColor }}>
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((s, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-white border border-gray-300 rounded-md text-sm"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Resume Builder</h2>

        {/* Personal Info */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FileText size={18} /> Personal Info
          </h3>
          {Object.keys(resumeData.personal_info).map((field) => (
            <input
              key={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={resumeData.personal_info[field]}
              onChange={(e) =>
                handleChange("personal_info", field, e.target.value)
              }
              className="w-full mb-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          ))}
        </div>

        {/* Summary */}
        <textarea
          placeholder="Professional Summary"
          value={resumeData.professional_summary}
          onChange={(e) =>
            setResumeData({ ...resumeData, professional_summary: e.target.value })
          }
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />

        {/* Experience */}
        <SectionEditor
          title="Experience"
          data={resumeData.experience}
          onAdd={addExperience}
          onChange={handleChange}
          section="experience"
        />

        {/* Education */}
        <SectionEditor
          title="Education"
          data={resumeData.education}
          onAdd={addEducation}
          onChange={handleChange}
          section="education"
        />

        {/* Skills */}
        <SkillInput addSkill={addSkill} />

        {/* Accent + Template */}
        <div className="border-t pt-4 space-y-3">
          <h3 className="font-semibold flex items-center gap-2 text-gray-700">
            <Palette size={18} /> Accent Color
          </h3>
          <div className="flex gap-2 flex-wrap">
            {accentColors.map((color) => (
              <button
                key={color}
                onClick={() => setAccentColor(color)}
                style={{ backgroundColor: color }}
                className={`w-6 h-6 rounded-full border-2 ${
                  accentColor === color ? "border-black" : "border-white"
                }`}
              />
            ))}
          </div>

          <h3 className="font-semibold flex items-center gap-2 text-gray-700">
            <Layout size={18} /> Template
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedTemplate("classic")}
              className={`flex-1 p-2 rounded-md ${
                selectedTemplate === "classic"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Classic
            </button>
            <button
              onClick={() => setSelectedTemplate("modern")}
              className={`flex-1 p-2 rounded-md ${
                selectedTemplate === "modern"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Modern
            </button>
          </div>
        </div>

        <button
          
          onClick={handleDownloadPDF}
          className="w-full mt-4 bg-green-500 text-white p-2 rounded-md flex items-center justify-center gap-2"
        >
          <Download size={18} /> Download PDF
        </button>
      </div>

      {/* Preview */}
      
      <div
        style={{ 
          width: "793px",
    // height: "1122px", // Let the height be auto
           margin: "auto",
    padding: "20px",
    boxSizing: "border-box",
    fontSize: "12px",
    overflow: "auto",
        }}
        ref={previewRef}
        className=" bg-white shadow-lg rounded-lg  overflow-y-auto"
      >
        {renderTemplate()}
      </div>
    </div>
  );
};

// Components
const Section = ({ title, accent, children }) => (
  <div className="mt-6">
    <h2
      className="text-lg font-semibold mb-2 border-b-2 pb-1"
      style={{ borderColor: accent }}
    >
      {title}
    </h2>
    {children}
  </div>
);

const SectionEditor = ({ title, data, onAdd, onChange, section }) => (
  <div>
    <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
      {title === "Experience" ? <Briefcase size={18} /> : <GraduationCap size={18} />}
      {title}
    </h3>
    {data.map((item, i) => (
      <div key={i} className="mb-3">
        {Object.keys(item).map((field) => (
          <input
            key={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={item[field]}
            onChange={(e) =>
              onChange(section, field, e.target.value, i)
            }
            className="w-full mb-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
        ))}
      </div>
    ))}
    <button
      onClick={onAdd}
      className="text-blue-600 text-sm flex items-center gap-1"
    >
      <Plus size={14} /> Add {title}
    </button>
  </div>
);

const SkillInput = ({ addSkill }) => {
  const [skill, setSkill] = useState("");
  return (
    <div>
      <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
        <Sparkles size={18} /> Skills
      </h3>
      <div className="flex gap-2">
        <input
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="Enter skill"
          className="flex-grow p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={() => {
            addSkill(skill);
            setSkill("");
          }}
          className="px-4 bg-blue-500 text-white rounded-md"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Resume;
