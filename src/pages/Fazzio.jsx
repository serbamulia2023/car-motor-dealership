import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const fazzioVariants = [
  {
    name: 'Hybrid Lux',
    price: 'Rp 24.395.000',
    colors: [
      {
        name: 'Titan',
        color: '#958B79',
        image: '/fazzio/lux-titan.jpg',
      },
      {
        name: 'White Pearl',
        color: '#F4F4F4',
        image: '/fazzio/lux-white.jpg',
      },
    ],
  },
  {
    name: 'Hybrid Neo',
    price: 'Rp 23.705.000',
    colors: [
      {
        name: 'Pink Mauve',
        color: '#D6A8A1',
        image: '/fazzio/neo-pink.jpg',
      },
      {
        name: 'Green',
        color: '#B7CBA4',
        image: '/fazzio/neo-green.jpg',
      },
      {
        name: 'Dull Blue',
        color: '#B4DAEE',
        image: '/fazzio/neo-blue.jpg',
      },
      {
        name: 'Yello',
        color: '#FFF500',
        image: '/fazzio/neo-yellow.jpg',
      },
      {
        name: 'White',
        color: '#FFFFFF',
        image: '/fazzio/neo-white.jpg',
      },
    ],
  },
  {
    name: 'Hybrid',
    price: 'Rp 22.900.000',
    colors: [
      {
        name: 'Grayceful Pink',
        color: '#D6B1B0',
        image: '/fazzio/hybrid-pink.jpg',
      },
      {
        name: 'Yolo Black',
        color: '#231F20',
        image: '/fazzio/hybrid-black.jpg',
      },
      {
        name: 'Red',
        color: '#D3262A',
        image: '/fazzio/hybrid-red.jpg',
      },
      {
        name: 'Black',
        color: '#000000',
        image: '/fazzio/hybrid-darkblack.jpg',
      },
    ],
  },
];

const Fazzio = () => {
  const navigate = useNavigate();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const variant = fazzioVariants[selectedVariantIndex];
  const selectedColor = variant.colors[selectedColorIndex];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">{variant.name}</h1>
        <p className="text-gray-700 mb-6 max-w-2xl">
          {variant.name === 'Hybrid Lux'
            ? 'Tampil mewah dan modern dengan desain eksklusif Fazzio Hybrid Lux — pilihan sempurna untuk gaya hidup premium.'
            : variant.name === 'Hybrid Neo'
            ? 'Gaya ekspresif dan pilihan warna berani menjadikan Fazzio Hybrid Neo cocok untuk anak muda aktif dan stylish.'
            : 'Fazzio Hybrid menghadirkan teknologi hybrid efisien dengan warna-warna khas yang berani tampil beda.'}
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
          {fazzioVariants.map((v, i) => (
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
              onClick={() => navigate('/yamaha/test-drive?model=Fazzio')}
              className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
            >
              Test Ride
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300"
            >
              Dapatkan Penawaran
            </button>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-gray-50 py-16 px-6 space-y-16">
        <Highlight title="Teknologi Blue Core Hybrid" text="Perpaduan mesin Blue Core dan Electric Power Assist memberikan efisiensi bahan bakar dan performa lebih optimal." />
        <Highlight title="Smart Motor Generator" text="Suara starter halus, tanpa hentakan." />
        <Highlight title="Electric Power Socket" text="Colokan listrik untuk pengisian daya gadget saat berkendara." />
        <Highlight title="Spacious Underseat Storage" text="Bagasi besar yang muat berbagai barang kebutuhan harian." />
        <Highlight title="Smart Key System" text="Fitur canggih tanpa anak kunci untuk kemudahan berkendara." />
        <Highlight title="Full Digital Speedometer" text="Tampilan modern dan informatif yang stylish." />
        <Highlight title="Yamaha Motorcycle Connect" text="Koneksi canggih dengan smartphone via aplikasi Y-Connect." />
        <Highlight title="LED Lighting System" text="Pencahayaan lebih terang dan tampilan lebih futuristik." />
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

export default Fazzio;
