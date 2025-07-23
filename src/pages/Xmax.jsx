import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const xmaxVariants = [
  {
    name: 'XMAX 250 Tech MAX',
    price: 'Rp 73.260.000',
    colors: [
      {
        name: 'Magma Black',
        color: '#231F20',
        image: '/xmax/techmax-black.jpg',
      },
    ],
  },
  {
    name: 'XMAX 250 Connected',
    price: 'Rp 67.965.000',
    colors: [
      {
        name: 'Elixir Dark Silver',
        color: '#C0C0C0',
        image: '/xmax/connected-silver.jpg',
      },
      {
        name: 'Premium Black',
        color: '#000000',
        image: '/xmax/connected-black.jpg',
      },
      {
        name: 'Luxury Red',
        color: '#C8102E',
        image: '/xmax/connected-red.jpg',
      },
    ],
  },
];

const Xmax = () => {
  const navigate = useNavigate();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const variant = xmaxVariants[selectedVariantIndex];
  const selectedColor = variant.colors[selectedColorIndex];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">{variant.name}</h1>
        <p className="text-gray-700 mb-6 max-w-2xl">
          {variant.name === 'XMAX 250 Tech MAX'
            ? 'Explore superior riding experience with the premium XMAX 250 Tech MAX. From elegant styling to high-end performance, this is your statement of pride on the road.'
            : 'The XMAX 250 Connected is built for the connected generation — futuristic, powerful, and packed with smart features to match your dynamic lifestyle.'}
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
        <div className="flex justify-center mt-8 gap-4">
          {xmaxVariants.map((v, i) => (
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
              onClick={() => navigate('/yamaha/test-drive?model=XMAX')}
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

      {/* Highlights Section */}
      <div className="bg-gray-50 py-16 px-6 space-y-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">ALL NEW BODY DESIGN</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Lebih agresif, modern, dan dinamis — desain bodi baru XMAX siap mencuri perhatian dan memberikan aerodinamika optimal.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">ULTIMATE CONNECTIVITY</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            TFT Display, navigasi bawaan, dan konektivitas smartphone: semua dikemas agar Anda selalu terhubung dan menikmati pengalaman berkendara terbaik.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">ULTIMATE PERFORMANCE</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Mesin Blue Core 250cc liquid cooled yang bertenaga, dengan handling stabil dan kenyamanan berkendara khas MAX Series.
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

export default Xmax;
