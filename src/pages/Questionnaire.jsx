import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import PersonalInfoSection from "../components/forms/PersonalInfoSection";
import DynamicFamilyTable from "../components/forms/DynamicFamilyTable";
import DynamicEducationTable from "../components/forms/DynamicEducationTable";
import WorkExperienceSection from "../components/forms/WorkExperienceSection";
import LeisureSection from "../components/forms/LeisureSection";
import QuestionnaireSection from "../components/forms/QuestionnaireSection";
import PDACheckboxSection from "../components/forms/PDACheckboxSection";

const Questionnaire = () => {
  const [formData, setFormData] = useState({
    personalInfo: {
      // fullName: "",
      // email: "",
      // gender: "",
      // nationality: "",
      // birthPlace: "",
      // birthDate: "",
      // bloodType: "",
      // address: "",
      // religion: "",
      // phoneNumber: "",
      // homePhoneNumber: "",
      // passportNumber: "",
      // photo: null,
      // cv: null,
    },
    family: [],
    education: [],
    workExperience: [],
    leisure: {},
    questionnaire: {},
    pdaAccepted: {
      first: false,
      second: false,
    },
  });

  const [openSections, setOpenSections] = useState({
    personalInfo: true,
    family: false,
    education: false,
    work: false,
    leisure: false,
    questionnaire: false,
    pda: false,
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem("signupCredentials");
    if (storedEmail) {
      try {
        const parsedEmail = JSON.parse(storedEmail);
        if (parsedEmail.email) {
          setFormData((prevData) => ({
            ...prevData,
            personalInfo: {
              ...prevData.personalInfo,
              email: parsedEmail.email,
            },
          }));
        }
      } catch (e) {
        console.error("Error parsing localStorage:", e);
      }
    }
  }, []);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sectionHeader = (label, sectionKey) => (
    <div
      className="flex justify-between items-center bg-gray-100 p-4 cursor-pointer text-lg font-semibold"
      onClick={() => toggleSection(sectionKey)}
    >
      <span>{label}</span>
      {openSections[sectionKey] ? <FaChevronUp /> : <FaChevronDown />}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Serba Mulia Questionnaire Form</h1>

      {/* Section 1: Personal Info */}
      {sectionHeader("1. Personal Information", "personalInfo")}
      {openSections.personalInfo && (
        <PersonalInfoSection
          data={formData.personalInfo}
          setData={(newData) =>{
              setFormData((prev) => ({
                ...prev,
                personalInfo: {
                  ...prev.personalInfo,
                  ...newData,
                },
              }))
            }
          }
        />
      )}

      {/* Section 2: Family */}
      {sectionHeader("2. Family", "family")}
      {openSections.family && (
        <DynamicFamilyTable
          data={formData.family}
          setData={(newData) =>
            setFormData((prev) => ({
              ...prev,
              family: newData,
            }))
          }
        />
      )}

      {/* Section 3: Education */}
      {sectionHeader("3. Education", "education")}
      {openSections.education && (
        <DynamicEducationTable
          data={formData.education}
          setData={(newData) =>
            setFormData((prev) => ({
              ...prev,
              education: newData,
            }))
          }
        />
      )}

      {/* Section 4: Work Experience */}
      {sectionHeader("4. Work Experience", "work")}
      {openSections.work && (
        <WorkExperienceSection
          data={formData.workExperience}
          setData={(newData) =>
            setFormData((prev) => ({
              ...prev,
              workExperience: newData,
            }))
          }
        />
      )}

      {/* Section 5: Leisure */}
      {sectionHeader("5. Leisure Activities", "leisure")}
      {openSections.leisure && (
        <LeisureSection
          data={formData.leisure}
          setData={(newData) =>
            setFormData((prev) => ({
              ...prev,
              leisure: {
                ...prev.leisure,
                ...newData,
              },
            }))
          }
        />
      )}

      {/* Section 6: Additional Questions */}
      {sectionHeader("6. Additional Questions", "questionnaire")}
      {openSections.questionnaire && (
        <QuestionnaireSection
          data={formData.questionnaire}
          setData={(newData) =>
            setFormData((prev) => ({
              ...prev,
              questionnaire: {
                ...prev.questionnaire,
                ...newData,
              },
            }))
          }
        />
      )}

      {/* Section 7: PDA Agreement */}
      {sectionHeader("7. Personal Data Agreement", "pda")}
      {openSections.pda && (
        <PDACheckboxSection
          data={formData.pdaAccepted}
          setData={(newData) =>
            setFormData((prev) => ({
              ...prev,
              pdaAccepted: {
                ...prev.pdaAccepted,
                ...newData,
              },
            }))
          }
        />
      )}

      {/* Submit Button */}
      <div className="text-center mt-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:bg-gray-400"
          disabled={!formData.pdaAccepted?.first || !formData.pdaAccepted?.second}
          onClick={() => {
            console.log("Form submitted:", formData);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
