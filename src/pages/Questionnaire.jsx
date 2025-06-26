import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import PersonalInfoSection from "../components/forms/PersonalInfoSection";
import DynamicFamilyTable from "../components/forms/DynamicFamilyTable";
import DynamicEducationTable from "../components/forms/DynamicEducationTable";
import WorkExperienceSection from "../components/forms/WorkExperienceSection";
import LeisureSection from "../components/forms/LeisureSection";
import QuestionnaireSection from "../components/forms/QuestionnaireSection";
import ReferenceSection from "../components/forms/ReferenceSection";
import PDACheckboxSection from "../components/forms/PDACheckboxSection";

const Questionnaire = () => {
  const location = useLocation();

  const [formData, setFormData] = useState({
    personalInfo: {},
    family: [],
    education: [],
    workExperience: [],
    leisure: {},
    questionnaire: [],
    reference: {},
    pdaAccepted: {
      first: false,
      second: false,
    },
  });

  const [openSections, setOpenSections] = useState({
    family: false,
    education: false,
    work: true,
    leisure: false,
    questionnaire: false,
    reference: false,
  });

  useEffect(() => {
    const stateCreds = location?.state;
    const storedCreds = localStorage.getItem("signupCredentials");

    let fullName = "";
    let email = "";

    try {
      if (stateCreds?.fullName || stateCreds?.email) {
        fullName = stateCreds.fullName || "";
        email = stateCreds.email || "";
      } else if (storedCreds) {
        const parsed = JSON.parse(storedCreds);
        fullName = parsed?.name || "";
        email = parsed?.email || "";
      }

      if (fullName || email) {
        setFormData((prev) => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            fullName,
            email,
          },
        }));
      }
    } catch (err) {
      console.error("❌ Failed to parse signup credentials:", err);
    }
  }, [location]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sectionWrapper = (label, sectionKey, children) => (
    <div className="border rounded-md shadow-sm">
      <div
        className="flex justify-between items-center bg-gray-100 p-4 cursor-pointer text-lg font-semibold"
        onClick={() => toggleSection(sectionKey)}
      >
        <span>{label}</span>
        {openSections[sectionKey] ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {openSections[sectionKey] && <div className="p-4">{children}</div>}
    </div>
  );

  const isPDACompleted = formData.pdaAccepted.first && formData.pdaAccepted.second;

  const handleSubmit = async () => {
    const form = new FormData();

    for (const key in formData.personalInfo) {
      if (key === "photo" || key === "cv") {
        if (formData.personalInfo[key]) {
          form.append(key, formData.personalInfo[key]);
        }
      } else {
        form.append(key, formData.personalInfo[key] || "");
      }
    }

    form.append("family", JSON.stringify(formData.family));
    form.append("education", JSON.stringify(formData.education));
    form.append("workExperience", JSON.stringify(formData.workExperience));
    form.append("leisure", JSON.stringify(formData.leisure));
    form.append("questionnaire", JSON.stringify(formData.questionnaire));
    form.append("reference", JSON.stringify(formData.reference));
    form.append("pdaAccepted", JSON.stringify(formData.pdaAccepted));

    try {
      const response = await axios.post("http://localhost:5050/api/questionnaire", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("✅ Submission success:", response.data);
      alert("✅ Form submitted successfully!");
    } catch (error) {
      console.error("❌ Submission failed:", error);
      alert("❌ Failed to submit form. Please check console.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Serba Mulia Questionnaire Form</h1>

      {/* 1. Personal Info */}
      <div className="border rounded-md shadow-sm">
        <h2 className="bg-gray-100 p-4 text-lg font-semibold">1. Personal Information</h2>
        <div className="p-4">
          <PersonalInfoSection
            data={formData.personalInfo}
            setData={(newData) =>
              setFormData((prev) => ({
                ...prev,
                personalInfo: {
                  ...prev.personalInfo,
                  ...newData,
                },
              }))
            }
          />
        </div>
      </div>

      {/* 2–7 Collapsible Sections */}
      {sectionWrapper("2. Family", "family", (
        <DynamicFamilyTable
          data={formData.family}
          setData={(newData) => setFormData((prev) => ({ ...prev, family: newData }))}
        />
      ))}

      {sectionWrapper("3. Education", "education", (
        <DynamicEducationTable
          data={formData.education}
          setData={(newData) => setFormData((prev) => ({ ...prev, education: newData }))}
        />
      ))}

      {sectionWrapper("4. Work Experience", "work", (
        <WorkExperienceSection
          data={formData.workExperience}
          setData={(newData) =>
            setFormData((prev) => ({
              ...prev,
              workExperience: Array.isArray(newData) ? [...newData] : [],
            }))
          }
        />
      ))}

      {sectionWrapper("5. Leisure Activities", "leisure", (
        <LeisureSection
          data={formData.leisure}
          setData={(newData) =>
            setFormData((prev) => ({
              ...prev,
              leisure: { ...prev.leisure, ...newData },
            }))
          }
        />
      ))}

      {sectionWrapper("6. Additional Questions", "questionnaire", (
        <QuestionnaireSection
          data={formData.questionnaire}
          setData={(newData) =>
            setFormData((prev) => ({
              ...prev,
              questionnaire: newData,
            }))
          }
        />
      ))}

      {sectionWrapper("7. Reference", "reference", (
        <ReferenceSection
          data={formData.reference}
          setData={(newData) =>
            setFormData((prev) => ({
              ...prev,
              reference: { ...prev.reference, ...newData },
            }))
          }
        />
      ))}

      {/* 8. PDA Section */}
      <div className="border rounded-md shadow-sm">
        <h2 className="bg-gray-100 p-4 text-lg font-semibold">8. Personal Data Agreement</h2>
        <div className="p-4">
          <PDACheckboxSection
            data={formData.pdaAccepted}
            setData={(newData) =>
              setFormData((prev) => ({
                ...prev,
                pdaAccepted: { ...prev.pdaAccepted, ...newData },
              }))
            }
          />
        </div>
      </div>

      {/* Submit */}
      <div className="text-center mt-6">
        <button
          className={`px-6 py-2 rounded font-semibold text-white ${
            isPDACompleted
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isPDACompleted}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
