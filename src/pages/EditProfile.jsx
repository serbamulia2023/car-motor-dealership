// EditProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import DashboardNavbar from "./DashboardNavbar";
import PersonalInfoSection from "../components/forms/PersonalInfoSection";
import DynamicFamilyTable from "../components/forms/DynamicFamilyTable";
import DynamicEducationTable from "../components/forms/DynamicEducationTable";
import WorkExperienceSection from "../components/forms/WorkExperienceSection";
import LeisureSection from "../components/forms/LeisureSection";
import QuestionnaireSection from "../components/forms/QuestionnaireSection";
import ReferenceSection from "../components/forms/ReferenceSection";
import PDACheckboxSection from "../components/forms/PDACheckboxSection";
import Toast from "../components/Toast";

const EditProfile = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [openSections, setOpenSections] = useState({
    family: false,
    education: false,
    work: false,
    leisure: false,
    questionnaire: false,
    referensi: false,
  });

  const methods = useForm({ defaultValues: {} });
  const { reset, watch } = methods;
  const watchPDA = watch("pdaAccepted");

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const showToast = (message, type = "success") => setToast({ message, type });
  const handleCloseToast = () => setToast(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/me", {
          withCredentials: true,
        });

        const data = res.data;

        reset({
          personalInfo: data.personalInfo || {},
          family: {
            rows: data.family || [],
            partnerWork: data.partnerWork || [],
          },
          education: data.education || [],
          kursus: data.kursus || [],
          bahasa: data.bahasa || [],
          kegiatan: data.kegiatan || [],
          workExperience: data.workExperience || [],
          businesses: data.businesses || [],
          leisure: data.leisure || {},
          questionnaire: data.questionnaire || [],
          referensi: {
            references: (data.reference || []).filter((r) => r.tipe === "referrer"),
            emergencyContacts: (data.reference || []).filter((r) => r.tipe === "emergency"),
          },
          pdaAccepted: { first: false, second: false },
        });
      } catch (err) {
        console.error("❌ Failed to load profile:", err);
        showToast("❌ Gagal memuat data profil", "error");
      }
    };

    fetchProfile();
  }, [reset]);

  const handleSubmit = async (formValues) => {
    const form = new FormData();
    const { personalInfo, referensi, ...rest } = formValues;
    const { photo, cv, ...info } = personalInfo || {};

    if (photo instanceof File) form.append("photo", photo);
    if (cv instanceof File) form.append("cv", cv);

    const allReferences = [
      ...(referensi.references || []).map((r) => ({ ...r, tipe: "referrer" })),
      ...(referensi.emergencyContacts || []).map((r) => ({ ...r, tipe: "emergency" })),
    ];

    form.append(
      "data",
      JSON.stringify({
        personalInfo: info,
        referensi: allReferences,
        ...rest,
      })
    );

    try {
      await axios.put(`http://localhost:5050/api/profiles/${info.email}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      showToast("✅ Berhasil menyimpan perubahan!", "success");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      console.error("❌ Submit gagal:", err);
      showToast("❌ Gagal menyimpan perubahan.", "error");
    }
  };

  const isPDACompleted = watchPDA?.first && watchPDA?.second;

  return (
    <>
      <DashboardNavbar />
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Edit Profile & Questionnaire</h1>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-6">
            <Section title="1. Personal Information">
              <PersonalInfoSection />
            </Section>

            <Section title="2. Family & Partner Work" open={openSections.family} toggle={() => toggleSection("family")}>
              <DynamicFamilyTable />
            </Section>

            <Section title="3. Education & Social Activities" open={openSections.education} toggle={() => toggleSection("education")}>
              <DynamicEducationTable />
            </Section>

            <Section title="4. Work & Business" open={openSections.work} toggle={() => toggleSection("work")}>
              <WorkExperienceSection mode="combined" />
            </Section>

            <Section title="5. Leisure" open={openSections.leisure} toggle={() => toggleSection("leisure")}>
              <LeisureSection />
            </Section>

            <Section title="6. Additional Questions" open={openSections.questionnaire} toggle={() => toggleSection("questionnaire")}>
              <QuestionnaireSection />
            </Section>

            <Section title="7. Reference" open={openSections.referensi} toggle={() => toggleSection("referensi")}>
              <ReferenceSection />
            </Section>

            <Section title="8. Personal Data Agreement">
              <PDACheckboxSection />
            </Section>

            <div className="text-center mt-6">
              <button
                type="submit"
                disabled={!isPDACompleted}
                className={`px-6 py-2 rounded font-semibold text-white ${
                  isPDACompleted ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Save Changes
              </button>
            </div>
          </form>
        </FormProvider>

        {toast && <Toast message={toast.message} type={toast.type} onClose={handleCloseToast} />}
      </div>
    </>
  );
};

const Section = ({ title, open = true, toggle, children }) => (
  <div className="border rounded-md shadow-sm">
    <div className="bg-gray-100 p-4 text-lg font-semibold flex justify-between cursor-pointer" onClick={toggle}>
      <span>{title}</span>
      {toggle && (open ? <FaChevronUp /> : <FaChevronDown />)}
    </div>
    {open && <div className="p-4">{children}</div>}
  </div>
);

export default EditProfile;
