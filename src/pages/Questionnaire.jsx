import React, { useEffect, useRef, useState } from "react";
import axios from "../axios";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronUp,
  FaQuestionCircle,
} from "react-icons/fa";

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

  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const showToast = (message, type = "success") =>
    setToast({ message, type });
  const handleCloseToast = () => setToast(null);

  const normalizeDate = (val) =>
    typeof val === "string" && val.includes("T") ? val.slice(0, 10) : val;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/me");
        emailRef.current = data.personalInfo?.email || data.user?.email || "";
        nameRef.current = data.personalInfo?.full_name || data.full_name || "User";

        reset({
          personalInfo: {
            ...data.personalInfo,
            hasBusiness: data.businesses?.length > 0,
            birth_date: normalizeDate(data.personalInfo?.birth_date),
            kendaraan: {
              jenis: data.personalInfo?.kendaraan?.jenis || "",
              lainnya: data.personalInfo?.kendaraan?.lainnya || "",
              status: data.personalInfo?.kendaraan?.status || "",
              detail: data.personalInfo?.kendaraan?.detail || "",
            },
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
          workExperience: (data.workExperience || []).map((w) => ({
            ...w,
            dari: normalizeDate(w.dari),
            sampai: normalizeDate(w.sampai),
          })),
          businesses: data.businesses || [],
          leisure: {
            frekuensi_membaca: data.leisure?.frekuensi_membaca || "",
            topik_dibaca: data.leisure?.topik_dibaca || [],
            jenis_bacaan: Array.isArray(data.leisure?.jenis_bacaan)
              ? data.leisure.jenis_bacaan[0] || ""
              : typeof data.leisure?.jenis_bacaan === "string"
              ? data.leisure.jenis_bacaan
              : "",
            hobi: data.leisure?.hobi || "",
          },
          questionnaire: data.questionnaire || [],
          referensi: {
            references: data.reference?.references || [],
            emergencyContacts: data.reference?.emergencyContacts || [],
          },
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
    const {
      personalInfo,
      education,
      kursus,
      bahasa,
      kegiatan,
      family,
      workExperience,
      businesses,
      leisure,
      questionnaire,
      referensi,
      pdaAccepted,
      hasBusiness,
    } = formValues;

    const { photo, cv, ...info } = personalInfo;
    const email = info.email || emailRef.current;
    if (!email) {
      showToast("Email tidak ditemukan untuk mengirim data.", "error");
      return;
    }

    if (photo instanceof File) form.append("photo", photo);
    if (cv instanceof File) form.append("cv", cv);

    const reference = {
      references: (referensi?.references || []).map((r) => ({ ...r, tipe: "referrer" })),
      emergencyContacts: (referensi?.emergencyContacts || []).map((r) => ({ ...r, tipe: "emergency" })),
    };

    const flatEducation = [
      ...(education?.base || []),
      ...(education?.universities || []),
    ];

    const payload = {
      personalInfo: info,
      education: flatEducation,
      kursus,
      bahasa,
      kegiatan,
      family,
      workExperience,
      businesses,
      leisure,
      questionnaire,
      reference,
      pdaAccepted,
      hasBusiness,
    };

    // ✅ Console logs
    console.log("📤 Payload being submitted:", payload);
    console.log("📁 Photo:", photo);
    console.log("📄 CV:", cv);

    for (const [key, val] of Object.entries(payload)) {
      form.append(key, JSON.stringify(val));
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

  const isPDACompleted = watch("pdaAccepted")?.first && watch("pdaAccepted")?.second;

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <>
      <DashboardNavbar name={nameRef.current} />
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Serba Mulia Questionnaire Form</h1>
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
          <Toast message={toast.message} type={toast.type} onClose={handleCloseToast} />
        )}
        <a
          href="/questionnaire-guide"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50"
          title="Lihat Panduan Pengisian"
        >
          <FaQuestionCircle size={24} />
        </a>
      </div>
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
