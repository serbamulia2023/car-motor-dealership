import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const lexiVariants = [
  {
    name: 'Connected/ABS',
    price: 'Rp 31.450.000',
    colors: [
      {
        name: 'Magma Black',
        color: '#231F20',
        image: '/lexi/connected-black.jpg',
      },
    ],
  },
  {
    name: 'S Version',
    price: 'Rp 28.600.000',
    colors: [
      {
        name: 'Elixir Dark Silver',
        color: '#C0C0C0',
        image: '/lexi/s-silver.jpg',
      },
      {
        name: 'Magma Black',
        color: '#231F20',
        image: '/lexi/s-black.jpg',
      },
      {
        name: 'Matte Red',
        color: '#A10E1A',
        image: '/lexi/s-red.jpg',
      },
    ],
  },
  {
    name: 'Standard',
    price: 'Rp 26.800.000',
    colors: [
      {
        name: 'Metallic Red',
        color: '#D90000',
        image: '/lexi/standard-red.jpg',
      },
      {
        name: 'Metallic Black',
        color: '#000000',
        image: '/lexi/standard-black.jpg',
      },
      {
        name: 'Matte Grey',
        color: '#A9A9A9',
        image: '/lexi/standard-grey.jpg',
      },
    ],
  },
  {
    name: 'S MAX Version',
    price: 'Rp 28.800.000',
    colors: [
      {
        name: 'Elixir Dark Silver',
        color: '#C0C0C0',
        image: '/lexi/smax-silver.jpg',
      },
      {
        name: 'Magma Black',
        color: '#231F20',
        image: '/lexi/smax-black.jpg',
      },
      {
        name: 'Matte Red',
        color: '#A10E1A',
        image: '/lexi/smax-red.jpg',
      },
    ],
  },
  {
    name: 'Standard MAX Version',
    price: 'Rp 26.800.000',
    colors: [
      {
        name: 'Metallic Red',
        color: '#D90000',
        image: '/lexi/stdmax-red.jpg',
      },
      {
        name: 'Metallic Black',
        color: '#000000',
        image: '/lexi/stdmax-black.jpg',
      },
      {
        name: 'Matte Grey',
        color: '#A9A9A9',
        image: '/lexi/stdmax-grey.jpg',
      },
    ],
  },
];

const Lexi = () => {
  const navigate = useNavigate();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const variant = lexiVariants[selectedVariantIndex];
  const selectedColor = variant.colors[selectedColorIndex];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">{variant.name}</h1>
        <p className="text-gray-700 mb-6 max-w-2xl">
          {variant.name.includes('Connected')
            ? 'Rasakan performa tinggi dan kenyamanan luar biasa dalam satu paket stylish — Lexi Connected/ABS hadir untuk mendukung gaya hidup modern Anda.'
            : 'Yamaha Lexi terbaru menggabungkan kenyamanan, kelincahan, dan desain elegan — cocok untuk mobilitas harian yang premium dan praktis.'}
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
          {lexiVariants.map((v, i) => (
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
              onClick={() => navigate('/yamaha/test-drive?model=Lexi')}
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
        <Highlight title="MAXi Power 155cc Blue Core & VVA" text="Mesin Blue Core berkapasitas 155cc yang powerful dan efisien, menjadikan pengalaman berkendara lebih bertenaga dan menyenangkan." />
        <Highlight title="Anti-Lock Braking System" text="Kontrol pengereman lebih optimal dengan ABS untuk kenyamanan dan keamanan ekstra." />
        <Highlight title="MAXi Flat Footboard" text="Ruang pijakan kaki luas dengan deck rata yang memudahkan akses dan kenyamanan." />
        <Highlight title="The Lightest MAXi" text="Bobot paling ringan di kategori MAXi Yamaha — mudah dikendarai dan diparkir." />
        <Highlight title="MAXi Long Seat" text="Seat panjang dan nyaman untuk perjalanan sendiri maupun berboncengan." />
        <Highlight title="Handlebar Switch Control" text="Kontrol pengaturan speedometer jadi lebih mudah lewat switch di handle kiri." />
        <Highlight title="Electric Power Socket" text="Isi daya gadget selama perjalanan dengan soket listrik bawaan." />
        <Highlight title="Sub-Tank Suspension" text="Suspensi dengan sub-tank untuk kenyamanan maksimal di berbagai medan jalan." />
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

export default Lexi;
