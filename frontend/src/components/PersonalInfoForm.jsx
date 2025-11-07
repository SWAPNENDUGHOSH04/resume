import {
  BriefcaseBusiness,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
  UserIcon,
} from "lucide-react";
import React from "react";

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  // ✅ Fixed handleChange placement & syntax
  const handleChange = (field, value) => {
    if (typeof onChange === "function") {
      onChange({ ...data, [field]: value });
    } else {
      console.warn("onChange is not a function in PersonalInfoForm");
    }
  };
  const [showPreview, setShowPreview] = React.useState(false);

  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel", required: true },
    { key: "location", label: "Location", icon: MapPin, type: "text", required: true },
    { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
    { key: "linkedin", label: "LinkedIn", icon: Linkedin, type: "url" },
    { key: "website", label: "Personal Website", icon: Globe, type: "url" },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h3>

      {/* Profile Image Upload */}
      <div className="flex items-center gap-4 mt-5">
        <label className="cursor-pointer">
          {data.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="userImg"
              className="w-16 h-16 rounded-full object-cover ring ring-slate-300 hover:opacity-80"
            />
          ) : (
            <div className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-700">
              <UserIcon className="size-10 p-2.5 border rounded-full" />
              Upload Image
            </div>
          )}

          <input
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={(e) => handleChange("image", e.target.files[0])}
          />
        </label>

        {typeof data.image === "object" && (
          <div>
            <p className="text-sm text-gray-700 mb-1">Remove Background</p>
            <label className="relative inline-flex items-center cursor-pointer gap-3">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => setRemoveBackground((prev) => !prev)}
                checked={removeBackground}
              />
              <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
              <span
                className="dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full 
                transition-transform duration-200 ease-in-out peer-checked:translate-x-4"
              ></span>
            </label>
          </div>
        )}
      </div>

      {/* Input Fields */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8 bg-white rounded-2xl shadow-md mt-6">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.key} className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <Icon className="size-4" />
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={field.type}
                value={data[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg
                           focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none
                           transition-colors text-sm"
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                required={field.required}
              />
            </div>
          );
          
        })}
      </div>
      <div className="flex justify-center mt-8">
</div>
    </div>
  );
};

export default PersonalInfoForm;
