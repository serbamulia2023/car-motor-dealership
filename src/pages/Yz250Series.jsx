import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const variants = [
  {
    id: 'yz250x',
    name: 'YZ250X',
    price: 'Rp 120.000.000',
    color: { name: 'Blue', hex: '#0047AB', image: '/yz250x/blue.jpg' },
    description: 'YZ250X hadir dengan performa dua langkah tangguh untuk lintasan cross country dan kompetisi off-road ekstrem.',
    highlights: [
      {
        title: 'Stunning Two-Stroke Power: Tuned for Cross Country',
        text: 'Mesin YPVS™ 249cc 2 langkah dengan transmisi 5 percepatan rasio lebar siap menghadapi berbagai rintangan off-road.',
      },
      {
        title: 'Advanced Motocross-Derived Chassis',
        text: 'Sasis ringan berbahan aluminium yang presisi dan suspensi adjustable untuk kompetisi ekstrem.',
      },
    ],
  },
  {
    id: 'yz250f',
    name: 'YZ250F',
    price: 'Rp 129.000.000',
    color: { name: 'Blue', hex: '#0047AB', image: '/yz250f/blue.jpg' },
    description: 'YZ250F membawa teknologi mesin 4 langkah 250cc bertenaga dan dilengkapi fitur unggulan untuk dominasi lintasan.',
    highlights: [
      {
        title: 'Advanced 250cc Four-Stroke Engine',
        text: 'Teknologi 4 langkah 250cc dengan torsi maksimal dan mesin bertenaga tinggi.',
      },
      {
        title: 'Innovative Yamaha Power Tuner App',
        text: 'Atur arus bahan bakar & pembakaran secara presisi melalui aplikasi smartphone Yamaha.',
      },
      {
        title: 'Advanced Bilateral Aluminum Frame',
        text: 'Rangka bilateral aluminum dengan distribusi bobot ideal untuk stabilitas dan kelincahan.',
      },
    ],
  },
  {
    id: 'yz250fx',
    name: 'YZ250FX',
    price: 'Rp 124.000.000',
    color: { name: 'Blue', hex: '#0047AB', image: '/yz250fx/blue.jpg' },
    description: 'YZ250FX adalah motor cross country revolusioner dengan DNA YZ250F, lengkap dengan transmisi 6-percepatan dan Power Tuner App.',
    highlights: [
      {
        title: 'All-New Cross Country Racer',
        text: 'DNA YZ250F dengan mesin DOHC 250cc 4 langkah berpendingin cairan dan transmisi 6-percepatan.',
      },
      {
        title: 'Innovative Yamaha Power Tuner App',
        text: 'Kustomisasi mapping mesin secara real-time dan simpan data ke smartphone Anda.',
      },
    ],
  },
];

const Yz250Series = () => {
  const navigate = useNavigate();
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center flex flex-col items-center">
        {/* Variant Selector */}
        <div className="flex flex-wrap gap-4 mb-8">
          {variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariant(variant)}
              className={`px-4 py-2 rounded font-semibold border ${
                selectedVariant.id === variant.id ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {variant.name}
            </button>
          ))}
        </div>

        {/* Title & Desc */}
        <h1 className="text-4xl font-bold mb-4">{selectedVariant.name}</h1>
        <p className="text-gray-700 mb-6 max-w-2xl">{selectedVariant.description}</p>

        {/* Color */}
        <div className="flex flex-col items-center">
          <h2 className="font-semibold text-xl mb-4">Pilih Warna:</h2>
          <div className="w-10 h-10 rounded-full border-4 border-blue-600 flex items-center justify-center">
            <span
              className="block w-5 h-5 rounded-full"
              style={{ backgroundColor: selectedVariant.color.hex }}
            />
          </div>
          <div className="mt-4 text-lg font-semibold text-gray-800">{selectedVariant.color.name}</div>
        </div>

        {/* Image */}
        <div className="flex justify-center mt-10">
          <img src={selectedVariant.color.image} alt={selectedVariant.color.name} className="w-full max-w-lg rounded shadow" />
        </div>

        {/* Price & CTA */}
        <div className="text-center mt-6">
          <p className="text-xl font-bold text-red-600 mb-4">{selectedVariant.price}</p>
          <p className="text-sm text-gray-500 mb-4">Harga Rekomendasi Off The Road</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate(`/yamaha/test-drive?model=${selectedVariant.name}`)}
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
        {selectedVariant.highlights.map((item, idx) => (
          <Highlight key={idx} title={item.title} text={item.text} />
        ))}
      </div>

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

export default Yz250Series;
