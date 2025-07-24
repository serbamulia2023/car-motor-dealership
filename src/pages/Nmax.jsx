import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const nmaxVariants = [
  {
    name: '"TURBO" TECH MAX Ultimate',
    price: 'Rp 46.095.000',
    colors: [
      {
        name: 'Magma Black',
        color: '#231F20',
        image: '/nmax/ultimate-black.jpg',
      },
    ],
  },
  {
    name: '"TURBO" TECH MAX',
    price: 'Rp 44.115.000',
    colors: [
      {
        name: 'Magma Black',
        color: '#231F20',
        image: '/nmax/techmax-black.jpg',
      },
    ],
  },
  {
    name: '"TURBO"',
    price: 'Rp 38.615.000',
    colors: [
      {
        name: 'Elixir Dark Silver',
        color: '#C0C0C0',
        image: '/nmax/turbo-silver.jpg',
      },
      {
        name: 'Magma Black',
        color: '#231F20',
        image: '/nmax/turbo-black.jpg',
      },
    ],
  },
  {
    name: 'Neo S Version',
    price: 'Rp 35.350.000',
    colors: [
      { name: 'Red', color: '#FF0000', image: '/nmax/neos-red.jpg' },
      { name: 'White', color: '#FFFFFF', image: '/nmax/neos-white.jpg' },
      { name: 'Dull Blue', color: '#AFC8E0', image: '/nmax/neos-blue.jpg' },
      { name: 'Black', color: '#000000', image: '/nmax/neos-black.jpg' },
    ],
  },
  {
    name: 'Neo Version',
    price: 'Rp 33.415.000',
    colors: [
      { name: 'White', color: '#FFFFFF', image: '/nmax/neo-white.jpg' },
      { name: 'Red', color: '#FF0000', image: '/nmax/neo-red.jpg' },
      { name: 'Dull Blue', color: '#AFC8E0', image: '/nmax/neo-blue.jpg' },
      { name: 'Black', color: '#000000', image: '/nmax/neo-black.jpg' },
    ],
  },
];

const Nmax = () => {
  const navigate = useNavigate();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const variant = nmaxVariants[selectedVariantIndex];
  const selectedColor = variant.colors[selectedColorIndex];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">{variant.name}</h1>
        <p className="text-gray-700 mb-6 max-w-2xl">
          {variant.name.includes('TECH MAX')
            ? 'Gabungan teknologi dan kemewahan untuk pengalaman berkendara kelas atas.'
            : variant.name.includes('TURBO')
            ? 'Sensasi berkendara garang dengan performa maksimal dan desain sporty.'
            : 'Tampil semakin keren dengan desain elegan dan pilihan warna beragam, cocok untuk keseharian.'}
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
          {nmaxVariants.map((v, i) => (
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
              onClick={() => navigate('/yamaha/test-drive?model=NMAX')}
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
          <h2 className="text-3xl font-bold mb-4">NAVIGASI SEMAKIN PINTAR</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            TFT Display interaktif dengan navigasi dan sistem konektivitas pintar bawa Anda lebih jauh dan tetap terhubung.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">PERFORMA SEMAKIN GARANG</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Mesin Blue Core 155cc dengan teknologi VVA dan fitur T-Mode & S-Mode: kencang dan efisien sesuai gaya berkendara Anda.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">DESAIN MEWAH & SPORTY</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Dari tampilan gagah hingga finishing premium — NMAX "TURBO" memikat di setiap sudut jalan.
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

export default Nmax;
