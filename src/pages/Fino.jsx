import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const finoVariants = [
  {
    name: 'Grande',
    price: 'Rp 21.610.000',
    colors: [
      { name: 'Luxury Red', color: '#c60000', image: '/fino/grande-red.jpg' },
      { name: 'Royal Blue', color: '#1f3c63', image: '/fino/grande-blue.jpg' },
    ],
  },
  {
    name: 'Premium',
    price: 'Rp 20.400.000',
    colors: [
      { name: 'Black Espresso', color: '#000000', image: '/fino/premium-black.jpg' },
      { name: 'White Latte', color: '#f5f5f5', image: '/fino/premium-white.jpg' },
      { name: 'Creamy Grey', color: '#a4a4a4', image: '/fino/premium-grey.jpg' },
    ],
  },
  {
    name: 'Sporty',
    price: 'Rp 20.400.000',
    colors: [
      { name: 'Classic Tosca', color: '#7fe1bc', image: '/fino/sporty-tosca.jpg' },
      { name: 'Vintage Red', color: '#c60000', image: '/fino/sporty-red.jpg' },
      { name: 'Retro Grey', color: '#3c3c3c', image: '/fino/sporty-grey.jpg' },
    ],
  },
];

const Fino = () => {
  const navigate = useNavigate();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const variant = finoVariants[selectedVariantIndex];
  const selectedColor = variant.colors[selectedColorIndex];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">{variant.name}</h1>
        <p className="text-gray-700 mb-6 max-w-2xl">
          {variant.name === 'Grande'
            ? 'Kemewahan klasik dan sentuhan warna elegan membuat Fino Grande tampil lebih premium dan berkelas.'
            : variant.name === 'Premium'
            ? 'Fino Premium tampil dengan warna-warna kalem dan mewah yang cocok untuk gaya hidup modern.'
            : 'Fino Sporty hadir dengan tampilan retro yang dinamis dan warna khas untuk kamu yang aktif dan bergaya.'}
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
          {finoVariants.map((v, i) => (
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
              onClick={() => navigate('/yamaha/test-drive?model=Fino')}
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
        <Highlight title="Blue Core 125cc Engine" text="Mesin Blue Core 125cc yang efisien, bertenaga, dan andal." />
        <Highlight title="Advance Key System (AKS)" text="Fitur praktis untuk membuka penutup kunci dan menemukan lokasi motor." />
        <Highlight title="Retro Stylish Helmet" text="Helm retro stylish sesuai warna motor untuk setiap pembelian." />
        <Highlight title="Eco Indicator" text="Indikator irit untuk gaya berkendara lebih ekonomis." />
        <Highlight title="Matte Color Scheme" text="Pilihan warna matte eksklusif yang tampil premium dan elegan." />
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

export default Fino;
