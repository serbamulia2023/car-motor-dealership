import React, { useEffect, useRef, useState } from "react";
import axios from "../axios";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronUp,
  FaQuestionCircle,
} from "react-icons/fa";

import PersonalInfoSection from "../components/forms/PersonalInfoSection";
import DynamicFamilyTable from "../components/forms/DynamicFamilyTable";
import DynamicEducationTable from "../components/forms/DynamicEducationTable";
import WorkExperienceSection from "../components/forms/WorkExperienceSection";
import LeisureSection from "../components/forms/LeisureSection";
import QuestionnaireSection from "../components/forms/QuestionnaireSection";
import ReferenceSection from "../components/forms/ReferenceSection";
import PDACheckboxSection from "../components/forms/PDACheckboxSection";
import Toast from "../components/Toast";
import DashboardNavbar from "./DashboardNavbar";

const Questionnaire = () => {
  const navigate = useNavigate();
  const emailRef = useRef("");
  const nameRef = useRef("User");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState({
    family: false,
    education: false,
    work: false,
    leisure: false,
    questionnaire: false,
    referensi: false,
  });

  const methods = useForm();
  const { reset, watch, handleSubmit } = methods;
  const watchPDA = watch("pdaAccepted");
  const watchFiles = watch("personalInfo") || {};

  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const showToast = (message, type = "success") =>
    setToast({ message, type });
  const handleCloseToast = () => setToast(null);

  const normalizeDate = (value) =>
    typeof value === "string" && value.includes("T")
      ? value.slice(0, 10)
      : value;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/me");

        emailRef.current = data.personalInfo?.email || data.user?.email || "";
        nameRef.current = data.personalInfo?.fullName || data.full_name || "User";

        const normalizedWork = (data.workExperience || []).map((job) => ({
          ...job,
          dari: normalizeDate(job.dari),
          sampai: normalizeDate(job.sampai),
        }));

        reset({
          personalInfo: {
            ...(data.personalInfo || {}),
            birth_date: normalizeDate(data.personalInfo?.birth_date),
            ...(data.identification || {}),
            photo: data.personalInfo?.photo || null,
            cv: data.personalInfo?.cv || null,
          },
          family: {
            rows: data.family?.rows || [],
            partnerWork: data.family?.partnerWork || [],
          },
          education: {
            base: (data.education || []).filter((e) =>
              ["SD", "SMP", "SMA/SMK"].includes(e.jenjang)
            ),
            universities: (data.education || []).filter(
              (e) => e.jenjang === "Universitas"
            ),
          },
          kursus: data.kursus || [],
          bahasa: data.bahasa || [],
          kegiatan: data.kegiatan || [],
          workExperience: {
            workExperience: normalizedWork,
            businesses: data.businesses || [],
          },
          leisure: data.leisure || {},
          referensi: {
            references: Array.isArray(data.reference)
              ? data.reference.filter((r) => r.tipe === "referrer")
              : data.reference?.references || [],
            emergencyContacts: Array.isArray(data.reference)
              ? data.reference.filter((r) => r.tipe === "emergency")
              : data.reference?.emergencyContacts || [],
          },
          questionnaire: Array.isArray(data.questionnaire)
            ? data.questionnaire
            : [],
          pdaAccepted: {
            first: data.pdaAccepted?.first || false,
            second: data.pdaAccepted?.second || false,
          },
        });
      } catch (err) {
        console.error("❌ Failed to load profile:", err);
        showToast("❌ Gagal memuat data profil", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);

  const onSubmit = async (formValues) => {
    const form = new FormData();
    const { personalInfo, referensi, education, workExperience, ...rest } =
      formValues;
    const { photo, cv, ...info } = personalInfo || {};
    const email = info.email || emailRef.current;
    if (!email) {
      showToast("Email tidak ditemukan untuk mengirim data.", "error");
      return;
    }

    if (photo instanceof File) form.append("photo", photo);
    if (cv instanceof File) form.append("cv", cv);

    const reference = [
      ...(referensi?.references || []).map((r) => ({
        ...r,
        tipe: "referrer",
      })),
      ...(referensi?.emergencyContacts || []).map((r) => ({
        ...r,
        tipe: "emergency",
      })),
    ];

    const flatEducation = [
      ...(education?.base || []),
      ...(education?.universities || []),
    ].map((e) => ({
      ...e,
      tahun_masuk: e.tahunMasuk ?? null,
      tahun_lulus: e.tahunLulus ?? null,
    }));

    const fullPayload = {
      ...rest,
      personalInfo: { ...info, email },
      education: flatEducation,
      reference,
      workExperience,
    };

    for (const [key, value] of Object.entries(fullPayload)) {
      form.append(key, JSON.stringify(value));
    }

    try {
      await axios.post("/questionnaire", form, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      showToast("✅ Formulir berhasil dikirim!", "success");
      localStorage.setItem("profileComplete", "true");
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Submit error:", err);
      showToast("❌ Gagal mengirim data. Silakan cek console.", "error");
    }
  };

  const isPDACompleted = watchPDA?.first && watchPDA?.second;

  if (loading)
    return <div className="text-center py-12">Loading...</div>;

  return (
    <>
      <DashboardNavbar name={nameRef.current} />

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold mb-4">
          Serba Mulia Questionnaire Form
        </h1>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Section title="1. Personal Information">
              <PersonalInfoSection />
            </Section>

            <Section
              title="2. Family & Partner Work"
              open={openSections.family}
              toggle={() => toggleSection("family")}
            >
              <DynamicFamilyTable />
            </Section>

            <Section
              title="3. Education & Social Activities"
              open={openSections.education}
              toggle={() => toggleSection("education")}
            >
              <DynamicEducationTable />
            </Section>

            <Section
              title="4. Work & Business"
              open={openSections.work}
              toggle={() => toggleSection("work")}
            >
              <WorkExperienceSection mode="combined" />
            </Section>

            <Section
              title="5. Leisure"
              open={openSections.leisure}
              toggle={() => toggleSection("leisure")}
            >
              <LeisureSection />
            </Section>

            <Section
              title="6. Additional Questions"
              open={openSections.questionnaire}
              toggle={() => toggleSection("questionnaire")}
            >
              <QuestionnaireSection />
            </Section>

            <Section
              title="7. Reference"
              open={openSections.referensi}
              toggle={() => toggleSection("referensi")}
            >
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
                  isPDACompleted
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Submit
              </button>
            </div>
          </form>
        </FormProvider>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={handleCloseToast}
          />
        )}
      </div>

      <a
        href="/questionnaire-guide"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50"
        title="Lihat Panduan Pengisian"
      >
        <FaQuestionCircle size={24} />
      </a>
    </>
  );
};

const Section = ({ title, open = true, toggle, children }) => (
  <div className="border rounded-md shadow-sm">
    <div
      className="bg-gray-100 p-4 text-lg font-semibold flex justify-between cursor-pointer"
      onClick={toggle}
    >
      <span>{title}</span>
      {toggle && (open ? <FaChevronUp /> : <FaChevronDown />)}
    </div>
    {open && <div className="p-4">{children}</div>}
  </div>
);

export default Questionnaire;
