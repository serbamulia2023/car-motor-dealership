import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const freegoVariants = [
  {
    name: 'Connected',
    price: 'Rp 24.100.000',
    colors: [
      {
        name: 'Magma Black',
        color: '#2C1C1A',
        image: '/freego/connected-magma.jpg',
      },
      {
        name: 'Silver',
        color: '#DADADA',
        image: '/freego/connected-silver.jpg',
      },
    ],
  },
  {
    name: 'Standard',
    price: 'Rp 22.315.000',
    colors: [
      {
        name: 'White',
        color: '#FFFFFF',
        image: '/freego/standard-white.jpg',
      },
      {
        name: 'Red',
        color: '#D3262A',
        image: '/freego/standard-red.jpg',
      },
      {
        name: 'Sand',
        color: '#CFC3B1',
        image: '/freego/standard-sand.jpg',
      },
      {
        name: 'Black',
        color: '#000000',
        image: '/freego/standard-black.jpg',
      },
    ],
  },
];

const Freego = () => {
  const navigate = useNavigate();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const variant = freegoVariants[selectedVariantIndex];
  const selectedColor = variant.colors[selectedColorIndex];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">{variant.name}</h1>
        <p className="text-gray-700 mb-6 max-w-2xl">
          {variant.name === 'Connected'
            ? 'Freego Connected hadir dengan desain modern dan fitur Y-Connect yang menghubungkan motor dengan smartphone-mu.'
            : 'Freego Standard: pilihan terjangkau dengan kenyamanan ekstra dan performa Blue Core 125cc yang efisien.'}
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
          {freegoVariants.map((v, i) => (
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
              onClick={() => navigate('/yamaha/test-drive?model=Freego')}
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
        <Highlight
          title="Blue Core 125CC dengan SMG"
          text="Mesin Blue Core 125 yang membuat akselerasi semakin bertenaga, serta dilengkapi Smart Motor Generator (SMG) yang menjadikan suara mesin lebih halus saat dinyalakan."
        />
        <Highlight
          title="Stop & Start System"
          text="Fitur canggih dengan sistem otomatis yang membuat mesin stop atau mati saat berhenti lebih dari 5 detik dan menyala kembali saat tuas gas diputar."
        />
        <Highlight
          title="Sporty LED Headlight"
          text="Lampu depan LED dengan tampilan desain baru yang lebih sporty dan blue inner lens yang membuat tampilan semakin berkelas."
        />
        <Highlight
          title="Bagasi Besar 25L"
          text="Bagasi luas seperti NMAX, bisa menampung helm full face standar Yamaha dan barang bawaan lainnya."
        />
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

export default Freego;
