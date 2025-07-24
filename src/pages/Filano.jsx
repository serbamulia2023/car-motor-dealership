import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const filanoVariants = [
  {
    name: 'Hybrid Lux',
    price: 'Rp 28.445.000',
    colors: [
      {
        name: 'Magma Black',
        color: '#2D1E1E',
        image: '/filano/lux-black.jpg',
      },
      {
        name: 'Elixir Dark Silver',
        color: '#B6B6B6',
        image: '/filano/lux-silver.jpg',
      },
    ],
  },
  {
    name: 'Hybrid Neo',
    price: 'Rp 27.965.000',
    colors: [
      {
        name: 'Green',
        color: '#B7CBA4',
        image: '/filano/neo-green.jpg',
      },
      {
        name: 'Pink Mauve',
        color: '#D6A8A1',
        image: '/filano/neo-pink.jpg',
      },
      {
        name: 'Dull Blue',
        color: '#B4DAEE',
        image: '/filano/neo-blue.jpg',
      },
      {
        name: 'White',
        color: '#F8F8F8',
        image: '/filano/neo-white.jpg',
      },
    ],
  },
];

const Filano = () => {
  const navigate = useNavigate();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const variant = filanoVariants[selectedVariantIndex];
  const selectedColor = variant.colors[selectedColorIndex];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">{variant.name}</h1>
        <p className="text-gray-700 mb-6 max-w-2xl">
          {variant.name === 'Hybrid Lux'
            ? 'Grand Filano Hybrid Lux menghadirkan desain premium dengan warna eksklusif dan fitur canggih untuk gaya hidup modern Anda.'
            : 'Grand Filano Hybrid Neo hadir dengan warna-warna cerah dan desain stylish, ideal untuk mobilitas urban yang berkelas.'}
        </p>

        {/* Color Switcher */}
        <div className="flex flex-col items-center">
          <h2 className="font-semibold text-xl mb-4">Pilih Warna:</h2>
          <div className="flex gap-4 flex-wrap justify-center">
            {variant.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={() => setSelectedColorIndex(idx)}
                className={`w-10 h-10 rounded-full border-4 flex items-center justify-center ${
                  selectedColorIndex === idx ? 'border-blue-600' : 'border-gray-300'
                }`}
                title={color.name}
              >
                <span
                  className="block w-5 h-5 rounded-full"
                  style={{ backgroundColor: color.color }}
                />
              </button>
            ))}
          </div>
          <div className="mt-4 text-lg font-semibold text-gray-800">{selectedColor.name}</div>
        </div>

        {/* Variant Toggle */}
        <div className="flex justify-center mt-8 gap-4 flex-wrap">
          {filanoVariants.map((v, i) => (
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

        {/* Image */}
        <div className="flex justify-center mt-10">
          <img
            src={selectedColor.image}
            alt={selectedColor.name}
            className="w-full max-w-lg rounded shadow"
          />
        </div>

        {/* Price & CTA */}
        <div className="text-center mt-6">
          <p className="text-xl font-bold text-red-600 mb-4">{variant.price}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/yamaha/test-drive?model=Filano')}
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

      {/* Highlights */}
      <div className="bg-gray-50 py-16 px-6 space-y-16">
        <Highlight title="Mesin Blue Core Hybrid" text="Teknologi Blue Core Hybrid memberikan efisiensi bahan bakar lebih baik dengan performa tetap maksimal." />
        <Highlight title="Smart Front Refuel" text="Pengisian bensin lebih praktis tanpa membuka jok." />
        <Highlight title="Full Digital Speedometer" text="Tampilan digital modern yang informatif dan stylish." />
        <Highlight title="Electric Power Socket" text="Colokan listrik untuk mengisi daya gadget Anda selama berkendara." />
        <Highlight title="Bagasi Luas" text="Ruang penyimpanan luas yang praktis untuk membawa barang bawaan Anda." />
        <Highlight title="Smart Key System" text="Kemudahan menyalakan motor tanpa anak kunci dengan fitur smart key." />
        <Highlight title="LED Lights" text="Lampu LED depan & belakang untuk pencahayaan maksimal dan tampilan futuristik." />
        <Highlight title="Yamaha Motorcycle Connect" text="Konektivitas pintar melalui aplikasi Y-Connect langsung ke smartphone Anda." />
      </div>

      {/* Footer */}
      <footer className="w-full bg-black text-white text-center py-6 text-sm mt-auto">
        &copy; {new Date().getFullYear()} Yamaha by DriveNow. All rights reserved.
      </footer>
    </div>
  );
};

const Highlight = ({ title, text }) => (
  <div className="text-center">
    <h2 className="text-3xl font-bold mb-4">{title}</h2>
    <p className="text-gray-600 max-w-3xl mx-auto">{text}</p>
  </div>
);

export default Filano;
