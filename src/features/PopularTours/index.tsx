import React, { useState } from 'react';
import viTexts from '../../assets/locales/vi.json';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaBus, FaPlane, FaGlobe } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

interface Tour {
  title: string;
  location: string;
  date: string;
  duration: string;
  transport: string;
  price: string;
  badge?: string;
  specialPrice?: string;
  originalPrice?: string;
  airline?: string;
  viewDetails: string;
}

const PopularTours: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'domestic' | 'international'>('domestic');

  const renderTourCard = (tour: Tour, index: number) => (
    <div key={index} className="bg-white border border-gray-200 rounded overflow-hidden">
      <div className="relative">
        <img 
          src={`https://images.unsplash.com/photo-${1500000000000 + index}?w=400&h=250&fit=crop`}
          alt={tour.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x250/1e88e5/ffffff?text=Tour+${index + 1}`;
          }}
        />
        {tour.badge && <div className="absolute top-3 left-3 bg-red-600 text-white px-2.5 py-1 text-xs font-semibold uppercase">{tour.badge}</div>}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-base text-black mb-3">{tour.title}</h3>
        <div className="space-y-1.5 text-sm text-gray-700 mb-3">
          <p><span className="font-normal">Xuất phát:</span> {tour.location}</p>
          <p><span className="font-normal">Ngày khởi hành:</span> {tour.date}</p>
          <p><span className="font-normal">Thời gian:</span> {tour.duration}</p>
        </div>
        <div className="pt-2 border-t border-gray-100">
          <span className="text-2xl font-bold text-red-600">{tour.price}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-semibold text-black mb-6">{viTexts.popularTours.title}</h2>
        
        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          <button 
            className={`px-4 py-2 rounded font-medium focus:outline-none ${
              activeTab === 'domestic' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-black border border-gray-300'
            }`}
            onClick={() => setActiveTab('domestic')}
          >
            {viTexts.popularTours.domestic}
          </button>
          <button 
            className={`px-4 py-2 rounded font-medium focus:outline-none ${
              activeTab === 'international' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-black border border-gray-300'
            }`}
            onClick={() => setActiveTab('international')}
          >
            {viTexts.popularTours.international}
          </button>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'domestic' 
            ? viTexts.popularTours.tours.domestic.map((tour: Tour, index: number) => renderTourCard(tour, index))
            : viTexts.popularTours.tours.international.map((tour: Tour, index: number) => renderTourCard(tour, index))
          }
        </div>
      </div>
    </section>
  );
};

export default PopularTours;