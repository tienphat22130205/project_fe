import React, { useState } from 'react';
import viTexts from '../../../assets/locales/vi.json';
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
    <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      <div className="relative">
        <img 
          src={`https://images.unsplash.com/photo-${1500000000000 + index}?w=400&h=250&fit=crop`}
          alt={tour.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x250/1e88e5/ffffff?text=Tour+${index + 1}`;
          }}
        />
        {tour.badge && <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">{tour.badge}</div>}
        {tour.specialPrice && <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">{tour.specialPrice}</div>}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-3 line-clamp-2">{tour.title}</h3>
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-orange-500" /> {tour.location}</p>
          <p className="flex items-center gap-2"><FaCalendarAlt className="text-blue-500" /> {tour.date}</p>
          <p className="flex items-center gap-2"><FaClock className="text-green-500" /> {tour.duration}</p>
          <p className="flex items-center gap-2"><FaBus className="text-purple-500" /> {tour.transport}</p>
          {tour.airline && <p className="flex items-center gap-2"><FaPlane className="text-blue-600" /> {tour.airline}</p>}
        </div>
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex flex-col">
            {tour.originalPrice && <span className="text-xs text-gray-400 line-through">{tour.originalPrice}</span>}
            <span className="text-xl font-bold text-orange-500">{tour.price}</span>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">{tour.viewDetails}</button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{viTexts.popularTours.title}</h2>
        
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button 
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'domestic' 
                ? 'bg-orange-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('domestic')}
          >
            <MdLocationOn /> {viTexts.popularTours.domestic}
          </button>
          <button 
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'international' 
                ? 'bg-orange-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('international')}
          >
            <FaGlobe /> {viTexts.popularTours.international}
          </button>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'domestic' 
            ? viTexts.popularTours.tours.domestic.map((tour, index) => renderTourCard(tour, index))
            : viTexts.popularTours.tours.international.map((tour, index) => renderTourCard(tour, index))
          }
        </div>
      </div>
    </section>
  );
};

export default PopularTours;