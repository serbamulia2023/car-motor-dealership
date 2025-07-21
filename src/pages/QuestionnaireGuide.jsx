import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import PersonalInfoSection from '../components/forms/PersonalInfoSection';
import DynamicFamilyTable from '../components/forms/DynamicFamilyTable';
import DynamicEducationTable from '../components/forms/DynamicEducationTable';
import WorkExperienceSection from '../components/forms/WorkExperienceSection';
import LeisureSection from '../components/forms/LeisureSection';
import QuestionnaireSection from '../components/forms/QuestionnaireSection';
import ReferenceSection from '../components/forms/ReferenceSection';
import PDACheckboxSection from '../components/forms/PDACheckboxSection';
import DashboardNavbar from './DashboardNavbar';

const QuestionnaireGuide = () => {
  const methods = useForm({
  defaultValues: {
      personalInfo: {
        full_name: 'Andi Setiawan',
        gender: 'Laki-laki',
        birth_place: 'Jakarta',
        birth_date: '1998-08-15',
        blood_type: 'O',
        religion: 'Islam',
        nationality: 'Indonesia', // changed from WNI/WNA
        marital_status: 'Belum Kawin',
        address: 'Jl. Melati No. 10',
        phone: '081234567890',
        telepon_rumah: '0217654321',
        email: 'user101@email1.com',
        nik: '3174012301230001',
        npwp: '12.345.678.9-012.345',
        no_bpjs: '9876543210',
        sim_a: '12313',
        sim_c: '1312321',
        passport_number: '',
        kendaraan_jenis: 'Motor',
        kendaraan_jenis_lainnya: '',
        kendaraan_detail: 'Honda Vario 2020',
        kendaraan_status: 'Milik Sendiri',
      },
      education: {
        base: [
          { jenjang: 'SD', sekolah: 'SDN 1 Jakarta', kota: 'Jakarta', jurusan: 'NA', tahun_masuk: '2005', tahun_lulus: '2011' },
          { jenjang: 'SMP', sekolah: 'SMPN 1 Jakarta', kota: 'Jakarta', jurusan: 'NA', tahun_masuk: '2011', tahun_lulus: '2014' },
          { jenjang: 'SMA/SMK', sekolah: 'SMAN 5 Jakarta', kota: 'Jakarta', jurusan: 'IPA', tahun_masuk: '2014', tahun_lulus: '2017' },
        ],
        universities: [
          { sekolah: 'Universitas Indonesia', kota: 'Depok', jurusan: 'Teknik Informatika', tahun_masuk: '2017', tahun_lulus: '2021' }
        ]
      },
      kursus: [
        {
          bidang: 'Pemrograman Web',
          penyelenggara: 'Dicoding',
          kota: 'Online',
          lama: '3 bulan',
          tahun: '2021',
          dibiayai_oleh: 'Sendiri',
          lulus: 'Ya'
        }
      ],
      bahasa: [
        { nama: 'Inggris', bicara: 'Baik', menulis: 'Baik', membaca: 'Baik' },
        { nama: 'Jepang', bicara: 'Dasar', menulis: 'Dasar', membaca: 'Dasar' }
      ],
      kegiatan: [
        {
          nama_organisasi: 'AIESEC UI',
          macam_kegiatan: 'Volunteer Exchange',
          tahun: '2019',
          jabatan: 'Member'
        }
      ],
      workExperience: [
        {
          dari: '2022-01-01',
          sampai: '2023-06-30',
          masih_bekerja: false,
          nama_perusahaan: 'Shopee Indonesia',
          jenis_usaha: 'E-commerce',
          jabatan_awal: 'Intern',
          jabatan_akhir: 'QA Engineer',
          deskripsi_pekerjaan: 'Mengelola proses QA supply chain',
          jumlah_karyawan: '2000',
          alasan_berhenti: 'Selesai kontrak',
          atasan_langsung: 'Bapak Joko',
          nama_direktur: 'Ibu Lestari'
        }
      ],
      hasBusiness: true,
      businesses: [
        {
          nama_perusahaan: 'Digital Nusantara',
          alamat: 'Jakarta Selatan',
          no_telp: '02188888888',
          tahun_berdiri: '2020',
          status_kepemilikan: 'Sendiri',
          jenis_usaha: 'Software House',
          jumlah_karyawan: '5',
          pendapatan_bulanan: '15000000'
        }
      ],
      family: {
        rows: [
          { nama: 'Budi Setiawan', usia: '56', hubungan: 'Ayah', no_hp: 'na', pekerjaan: 'PNS', gender: 'Laki-laki', pendidikan: 'S1', keterangan: 'Ayah' },
          { nama: 'Siti Aminah', usia: '55', hubungan: 'Ibu', no_hp: '081234222222', pekerjaan: 'Ibu Rumah Tangga', gender: 'Perempuan', pendidikan: 'SMA', keterangan: 'Ibu' }
        ],
        partnerWork: []
      },
      referensi: {
        references: [
          {
            nama: 'Joko Santoso',
            hubungan: 'Atasan',
            perusahaan_or_alamat: 'Shopee Indonesia',
            jabatan: 'Manager',
            no_hp: '081234000000'
          }
        ],
        emergencyContacts: [
          {
            nama: 'Siti Aminah',
            hubungan: 'Ibu',
            perusahaan_or_alamat: 'Jl. Melati No.10',
            jabatan: 'NA',
            no_hp: '081234222222'
          }
        ]
      },
      questionnaire: [
        {
          question: 'Apakah anda pernah melamar di perusahaan ini sebelumnya?',
          answer: 'yes',
          explanation: 'Saya pernah melamar di posisi admin tahun lalu.',
        },
        {
          question: 'Selain di sini, di perusahaan mana lagi anda sedang melamar? Sebagai apa?',
          answer: 'no',
          explanation: 'NA',
        },
        {
          question: 'Apakah anda terikat kontrak dengan perusahaan tempat anda bekerja saat ini?',
          answer: 'no',
          explanation: 'NA',
        },
        {
          question: 'Apakah anda mempunyai pekerjaan sampingan?',
          answer: 'yes',
          explanation: 'Saya freelance desain grafis.',
        }
      ],
      leisure: {
        frekuensi_membaca: 'Sedang',
        topik_dibaca: ['Teknologi', 'Bisnis'],
        jenis_bacaan: 'koran',
        hobi: 'Futsal, Coding, Traveling'
      },
      pdaAccepted: {
        first: true,
        second: true
      }
    }
  });

  return (
    <>
      <DashboardNavbar />
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Panduan Pengisian Formulir Serba Mulia
        </h1>

        <p className="text-sm text-gray-600 mb-4">
          Kolom yang bertanda <span className="text-red-600">*</span> wajib diisi. Untuk kolom yang opsional dan tidak ada jawabannya, Anda dapat mengetik <strong>"NA"</strong> atau pilih dari dropdown.
        </p>

        <FormProvider {...methods}>
          <Section title="1. Personal Information">
            <Instruction>
              Lengkapi semua data diri sesuai identitas. Jika Anda WNA, pilih kewarganegaraan sesuai paspor.
            </Instruction>
            <PersonalInfoSection />
          </Section>

          <Section title="2. Family & Partner Work">
            <Instruction>
              Masukkan data anggota keluarga. Jika tidak memiliki nomor HP, isi dengan <code>na</code>. Pastikan <strong>ayah</strong> dan <strong>ibu</strong> selalu ada. Masukkan diri anda sendiri sebagai saudara seperti pada contoh di bawah. Jika ada kolom yang tidak diketahui, isi denhan "NA".
            </Instruction>
            <DynamicFamilyTable />
          </Section>

          <Section title="3. Education & Social Activities">
            <Instruction>
              Masukkan riwayat pendidikan dari SD hingga universitas, serta kursus, bahasa, dan kegiatan sosial. Jika tidak ada, isi "NA" pada kolom.
            </Instruction>
            <DynamicEducationTable />
          </Section>

          <Section title="4. Work & Business">
            <Instruction>
              Masukkan pengalaman kerja dan usaha pribadi jika ada. Jika belum pernah bekerja, kosongkan.
            </Instruction>
            <WorkExperienceSection mode="combined" />
          </Section>

          <Section title="5. Leisure">
            <Instruction>
              Tulis kegiatan yang biasa dilakukan di waktu senggang. Kolom "jenis bacaan" dapat dikosongkan jika tidak membaca, atau isi "NA".
            </Instruction>
            <LeisureSection />
          </Section>

          <Section title="6. Additional Questions">
            <Instruction>
              Jawab pertanyaan tambahan secara jujur. Untuk pertanyaan yang tidak relevan, isi dengan "NA".
            </Instruction>
            <QuestionnaireSection />
          </Section>

          <Section title="7. Reference">
            <Instruction>
              Tambahkan minimal satu kontak darurat. Referensi kerja boleh dikosongkan jika tidak ada.
            </Instruction>
            <ReferenceSection />
          </Section>

          <Section title="8. Personal Data Agreement">
            <Instruction>
              Anda harus mencentang dua kotak persetujuan sebelum dapat menyimpan form.
            </Instruction>
            <PDACheckboxSection />
          </Section>
        </FormProvider>
      </div>
    </>
  );
};

const Section = ({ title, children }) => (
  <div className="border rounded-md shadow p-4 space-y-4">
    <h2 className="text-xl font-semibold">{title}</h2>
    {children}
  </div>
);

const Instruction = ({ children }) => (
  <p className="text-sm text-gray-700 italic mb-2">{children}</p>
);

export default QuestionnaireGuide;
