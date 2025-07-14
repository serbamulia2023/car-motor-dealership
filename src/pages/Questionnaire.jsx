import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useForm, FormProvider } from "react-hook-form";

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
  const methods = useForm({
    defaultValues: {
      personalInfo: {
        full_name: "",
        email: "",
        gender: "",
        birth_place: "",
        birth_date: "",
        blood_type: "",
        religion: "",
        nationality: "",
        marital_status: "",
        address: "",
        phone: "",
        telepon_rumah: "",
        nik: "",
        npwp: "",
        no_bpjs: "",
        sim_a: "",
        sim_c: "",
        passport_number: "",
        kendaraan_jenis: "",
        kendaraan_jenis_lainnya: "",
        kendaraan_detail: "",
        kendaraan_status: "",
        photo: null,
        cv: null,
      },
      family: { rows: [], partnerWork: [] },
      education: [],
      kursus: [],
      bahasa: [],
      kegiatan: [],
      workExperience: [],
      businesses: [],
      leisure: {},
      questionnaire: [],
      referensi: { references: [], emergencyContacts: [] },
      pdaAccepted: { first: false, second: false },
    },
  });

  const { watch, reset, handleSubmit } = methods;
  const navigate = useNavigate();
  const location = useLocation();
  const [toast, setToast] = useState(null);

  const [openSections, setOpenSections] = useState({
    family: true,
    education: true,
    work: true,
    leisure: false,
    questionnaire: false,
    referensi: false,
  });

  const showToast = (message, type = "success") => setToast({ message, type });
  const handleCloseToast = () => setToast(null);

  const isPDACompleted = watch("pdaAccepted.first") && watch("pdaAccepted.second");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/me", { withCredentials: true });
        reset(res.data);
      } catch {
        const state = location?.state;
        const stored = localStorage.getItem("signupCredentials");
        let fallbackName = "", fallbackEmail = "";

        if (state?.fullName || state?.email) {
          fallbackName = state.fullName || "";
          fallbackEmail = state.email || "";
        } else if (stored) {
          try {
            const parsed = JSON.parse(stored);
            fallbackName = parsed?.name || "";
            fallbackEmail = parsed?.email || "";
          } catch {}
        }

        reset({ personalInfo: { full_name: fallbackName, email: fallbackEmail } });
      }
    };
    fetchUserInfo();
  }, [location, reset]);

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const onSubmit = async (data) => {
    const form = new FormData();
    const { photo, cv, ...info } = data.personalInfo || {};

    if (photo) form.append("photo", photo);
    if (cv) form.append("cv", cv);

    const payload = { ...data, personalInfo: info };
    form.append("data", JSON.stringify(payload));

    try {
      await axios.post("http://localhost:5050/api/questionnaire", form, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      showToast("✅ Berhasil mengirim form!", "success");
      localStorage.setItem("profileComplete", "true");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      console.error("❌ Submit gagal:", err);
      showToast("❌ Gagal mengirim data. Silakan cek console.", "error");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          <h1 className="text-2xl font-bold mb-4">Serba Mulia Questionnaire Form</h1>

          <Section title="1. Personal Information">
            <PersonalInfoSection />
          </Section>

          <Section title="2. Family & Partner" open={openSections.family} toggle={() => toggleSection("family")}>
            <DynamicFamilyTable />
          </Section>

          <Section title="3. Education & Activities" open={openSections.education} toggle={() => toggleSection("education")}>
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
              Submit
            </button>
          </div>

          {toast && <Toast message={toast.message} type={toast.type} onClose={handleCloseToast} />}
        </div>
      </form>
    </FormProvider>
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
