import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const aeroxVariants = [
  {
    name: '"TURBO" Ultimate',
    price: 'Rp 41.730.000',
    colors: [
      {
        name: 'Matte Dark Grey',
        color: '#3A3A3A',
        image: '/aerox/turbo-ultimate-darkgrey.jpg',
      },
    ],
  },
  {
    name: '"TURBO"',
    price: 'Rp 39.550.000',
    colors: [
      {
        name: 'Matte Dark Grey',
        color: '#3A3A3A',
        image: '/aerox/turbo-darkgrey.jpg',
      },
    ],
  },
  {
    name: 'CyberCity',
    price: 'Rp 33.990.000',
    colors: [
      {
        name: 'Matte Blue Red',
        color: '#1E1E9D',
        image: '/aerox/cybercity-bluered.jpg',
      },
      {
        name: 'Matte Blue Yellow',
        color: '#FFD700',
        image: '/aerox/cybercity-blueyellow.jpg',
      },
    ],
  },
  {
    name: 'Standard',
    price: 'Rp 29.900.000',
    colors: [
      {
        name: 'Silver',
        color: '#C0C0C0',
        image: '/aerox/standard-silver.jpg',
      },
      {
        name: 'Dark Blue',
        color: '#1E1E9D',
        image: '/aerox/standard-darkblue.jpg',
      },
      {
        name: 'Red',
        color: '#C8102E',
        image: '/aerox/standard-red.jpg',
      },
      {
        name: 'Black',
        color: '#000000',
        image: '/aerox/standard-black.jpg',
      },
    ],
  },
];

const Aerox = () => {
  const navigate = useNavigate();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const variant = aeroxVariants[selectedVariantIndex];
  const selectedColor = variant.colors[selectedColorIndex];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">{variant.name}</h1>
        <p className="text-gray-700 mb-6 max-w-2xl">
          {variant.name.includes('TURBO')
            ? 'Ditenagai mesin Blue Core 155cc dengan teknologi Turbo untuk akselerasi lebih responsif dan performa yang mengagumkan.'
            : variant.name === 'CyberCity'
            ? 'Tampil berani dengan desain futuristik dan warna mencolok. Aerox CyberCity cocok untuk kamu yang suka tampil beda.'
            : 'Versi standar dengan fitur lengkap dan desain sporty, cocok untuk kebutuhan harian yang stylish dan efisien.'}
        </p>

        {/* Color Switcher */}
        <div className="flex flex-col items-center text-center">
          <h2 className="font-semibold text-xl mb-4">Pilih Warna:</h2>
          <div className="flex gap-4 flex-wrap justify-center">
            {variant.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={() => setSelectedColorIndex(idx)}
                className={`w-10 h-10 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                  selectedColorIndex === idx ? 'border-blue-500' : 'border-gray-300'
                }`}
                title={color.name}
              >
                <span
                  className="block w-5 h-5 rounded-full"
                  style={{ backgroundColor: color.color }}
                ></span>
              </button>
            ))}
          </div>
          <div className="mt-4 text-lg font-semibold text-gray-800">{selectedColor.name}</div>
        </div>

        {/* Variant Toggle */}
        <div className="flex justify-center mt-8 gap-4 flex-wrap">
          {aeroxVariants.map((v, i) => (
            <button
              key={v.name}
              onClick={() => {
                setSelectedVariantIndex(i);
                setSelectedColorIndex(0);
              }}
              className={`px-5 py-2 rounded border text-sm font-semibold ${
                selectedVariantIndex === i ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {v.name}
            </button>
          ))}
        </div>

        {/* Product Image */}
        <div className="flex justify-center mt-10">
          <img
            src={selectedColor.image}
            alt={selectedColor.name}
            className="w-full max-w-lg rounded shadow"
          />
        </div>

        {/* Price and CTAs */}
        <div className="text-center mt-6">
          <p className="text-xl font-bold text-red-600 mb-4">{variant.price}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/yamaha/test-drive?model=AEROX')}
              className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
            >
              Test Ride
            </button>
            <button
              onClick={() => navigate('/contact', { state: { from: 'yamaha' } })}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300"
            >
              Dapatkan Penawaran
            </button>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="bg-gray-50 py-16 px-6 space-y-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">NEW ENGINE 155CC "TURBO"</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Performa semakin gahar dengan mesin baru 155cc berteknologi Turbo yang meningkatkan efisiensi tenaga dan akselerasi.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">SPORTY RIDING POSITION</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Posisi berkendara lebih agresif dan ergonomis untuk kontrol maksimal dan pengalaman berkendara yang menyenangkan.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">FULL DIGITAL SPEEDOMETER</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Dilengkapi panel digital yang terhubung ke smartphone melalui Y-Connect, tampil modern dan informatif.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">DOUBLE DISC BRAKE</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Sistem pengereman cakram ganda depan-belakang memberikan keamanan ekstra dalam berbagai kondisi jalan.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-black text-white text-center py-6 text-sm mt-auto">
        &copy; {new Date().getFullYear()} Yamaha by DriveNow. All rights reserved.
      </footer>
    </div>
  );
};

export default Aerox;
