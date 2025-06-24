import React, { useEffect, useState } from "react";
import PersonalInfoSection from "../components/forms/PersonalInfoSection";
import FamilySection from "../components/forms/FamilySection";
import EducationSection from "../components/forms/EducationSection";
import WorkExperienceSection from "../components/forms/WorkExperienceSection";
import LeisureSection from "../components/forms/LeisureSection";
import QuestionnaireSection from "../components/forms/QuestionnaireSection";
import PDACheckboxSection from "../components/forms/PDACheckboxSection";

const Questionnaire = () => {
  const [formData, setFormData] = useState({
    personalInfo: {},
    family: [],
    education: [],
    workExperience: [],
    leisure: {},
    questionnaire: {},
    pdaAccepted: { first: false, second: false },
  });

  // Toggle state for each section
  const [openSections, setOpenSections] = useState({
    personalInfo: true,
    family: false,
    education: false,
    workExperience: false,
    leisure: false,
    questionnaire: false,
    pda: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("signupCredentials");
      if (storedData) {
        const parsed = JSON.parse(storedData);
        setFormData((prev) => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            email: parsed.email || "",
          },
        }));
      }
    } catch (error) {
      console.error("Failed to parse signupCredentials:", error);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle submission logic
  };

  const sectionStyle = {
    marginBottom: "1rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    overflow: "hidden",
  };

  const headerStyle = {
    background: "#f0f0f0",
    padding: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const contentStyle = {
    padding: "1rem",
    background: "#fff",
  };

  return (
    <div className="questionnaire-container" style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "2rem" }}>📝 Application Questionnaire</h1>

      <form onSubmit={handleSubmit}>
        {/* Personal Info */}
        <div style={sectionStyle}>
          <div style={headerStyle} onClick={() => toggleSection("personalInfo")}>
            1. Personal Information {openSections.personalInfo ? "▲" : "▼"}
          </div>
          {openSections.personalInfo && (
            <div style={contentStyle}>
              <PersonalInfoSection data={formData.personalInfo} setData={setFormData} />
            </div>
          )}
        </div>

        {/* Family Section */}
        <div style={sectionStyle}>
          <div style={headerStyle} onClick={() => toggleSection("family")}>
            2. Family Information {openSections.family ? "▲" : "▼"}
          </div>
          {openSections.family && (
            <div style={contentStyle}>
              <FamilySection data={formData.family} setData={setFormData} />
            </div>
          )}
        </div>

        {/* Education Section */}
        <div style={sectionStyle}>
          <div style={headerStyle} onClick={() => toggleSection("education")}>
            3. Education Background {openSections.education ? "▲" : "▼"}
          </div>
          {openSections.education && (
            <div style={contentStyle}>
              <EducationSection data={formData.education} setData={setFormData} />
            </div>
          )}
        </div>

        {/* Work Experience */}
        <div style={sectionStyle}>
          <div style={headerStyle} onClick={() => toggleSection("workExperience")}>
            4. Work Experience {openSections.workExperience ? "▲" : "▼"}
          </div>
          {openSections.workExperience && (
            <div style={contentStyle}>
              <WorkExperienceSection data={formData.workExperience} setData={setFormData} />
            </div>
          )}
        </div>

        {/* Leisure Section */}
        <div style={sectionStyle}>
          <div style={headerStyle} onClick={() => toggleSection("leisure")}>
            5. Leisure Activities {openSections.leisure ? "▲" : "▼"}
          </div>
          {openSections.leisure && (
            <div style={contentStyle}>
              <LeisureSection data={formData.leisure} setData={setFormData} />
            </div>
          )}
        </div>

        {/* Additional Questionnaire */}
        <div style={sectionStyle}>
          <div style={headerStyle} onClick={() => toggleSection("questionnaire")}>
            6. Additional Questions {openSections.questionnaire ? "▲" : "▼"}
          </div>
          {openSections.questionnaire && (
            <div style={contentStyle}>
              <QuestionnaireSection data={formData.questionnaire} setData={setFormData} />
            </div>
          )}
        </div>

        {/* PDA Section */}
        <div style={sectionStyle}>
          <div style={headerStyle} onClick={() => toggleSection("pda")}>
            7. Personal Data Agreement {openSections.pda ? "▲" : "▼"}
          </div>
          {openSections.pda && (
            <div style={contentStyle}>
              <PDACheckboxSection data={formData.pdaAccepted} setData={setFormData} />
            </div>
          )}
        </div>

        {/* Submit */}
        <div style={{ marginTop: "2rem" }}>
          <button
            type="submit"
            disabled={!formData.pdaAccepted.first || !formData.pdaAccepted.second}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default Questionnaire;
