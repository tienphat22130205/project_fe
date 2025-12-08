import React from 'react';
import viTexts from '../../locales/vi.json';
import { FaSnowflake, FaGift, FaPlane, FaStar } from 'react-icons/fa';
import { GiMountains } from 'react-icons/gi';

const SpecialTours: React.FC = () => {
  const getIcon = (index: number) => {
    switch(index) {
      case 0: return <GiMountains />;
      case 1: return <FaGift />;
      case 2: return <FaStar />;
      case 3: return <FaPlane />;
      default: return <FaSnowflake />;
    }
  };

  const iconColors = ['text-blue-500', 'text-red-500', 'text-yellow-500', 'text-green-500'];
  const bgColors = ['bg-blue-50', 'bg-red-50', 'bg-yellow-50', 'bg-green-50'];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{viTexts.specialTours.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {viTexts.specialTours.tours.map((tour, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className={`${bgColors[index]} ${iconColors[index]} text-4xl p-4 rounded-full`}>
                  {getIcon(index)}
                </div>
              </div>
              <h3 className="text-sm md:text-base font-semibold text-gray-700">{tour}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialTours;