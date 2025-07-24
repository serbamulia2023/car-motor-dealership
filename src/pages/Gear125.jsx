import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const gearVariants = [
  {
    name: 'Standard',
    price: 'Rp 19.045.000',
    colors: [
      { name: 'Dull Blue', color: '#B4DAEE', image: '/gear125/standard-dullblue.jpg' },
      { name: 'Red', color: '#D3262A', image: '/gear125/standard-red.jpg' },
      { name: 'Cyan', color: '#00A8A8', image: '/gear125/standard-cyan.jpg' },
      { name: 'Olive', color: '#6B6E4E', image: '/gear125/standard-olive.jpg' },
      { name: 'Black', color: '#000000', image: '/gear125/standard-black.jpg' },
      { name: 'Sand', color: '#DDD3B7', image: '/gear125/standard-sand.jpg' },
    ],
  },
  {
    name: 'Hybrid S',
    price: 'Rp 22.000.000',
    colors: [
      { name: 'Dark Grey', color: '#666666', image: '/gear125/hybrids-darkgrey.jpg' },
      { name: 'Silver', color: '#DADADA', image: '/gear125/hybrids-silver.jpg' },
    ],
  },
  {
    name: 'Hybrid',
    price: 'Rp 21.000.000',
    colors: [
      { name: 'Dull Blue', color: '#B4DAEE', image: '/gear125/hybrid-dullblue.jpg' },
      { name: 'Sand', color: '#DDD3B7', image: '/gear125/hybrid-sand.jpg' },
      { name: 'Black', color: '#000000', image: '/gear125/hybrid-black.jpg' },
      { name: 'Red', color: '#D3262A', image: '/gear125/hybrid-red.jpg' },
    ],
  },
];

const Gear125 = () => {
  const navigate = useNavigate();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const variant = gearVariants[selectedVariantIndex];
  const selectedColor = variant.colors[selectedColorIndex];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">{variant.name}</h1>
        <p className="text-gray-700 mb-6 max-w-2xl">
          {variant.name === 'Standard'
            ? 'Desain tangguh dengan fitur praktis seperti double hook, power socket, dan Blue Core 125cc SMG yang irit dan bertenaga.'
            : variant.name === 'Hybrid S'
            ? 'Tampilan eksklusif dan performa maksimal dengan teknologi Hybrid dan warna premium.'
            : 'Teknologi Blue Core Hybrid untuk performa efisien dan pilihan warna menarik untuk mobilitas harian.'}
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
          {gearVariants.map((v, i) => (
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
              onClick={() => navigate('/yamaha/test-drive?model=Gear 125')}
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
        <Highlight title="Blue Core 125cc dengan SMG" text="Mesin 125cc generasi baru dengan Smart Motor Generator menghasilkan suara starter yang lebih halus dan efisien." />
        <Highlight title="Desain Tangguh" text="Tampilan modern dan tangguh yang cocok untuk berbagai aktivitas harian." />
        <Highlight title="Pijakan Kaki Anak" text="Kenyamanan ekstra saat berboncengan dengan anak kecil." />
        <Highlight title="Double Hook" text="Gantungan ganda untuk membawa lebih banyak barang sekaligus." />
        <Highlight title="Electric Power Socket" text="Colokan daya untuk mengisi baterai gadget kamu di perjalanan." />
        <Highlight title="Stop & Start System" text="Mesin mati otomatis saat berhenti lebih dari 5 detik, aktif kembali saat gas diputar." />
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

export default Gear125;
