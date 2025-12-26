import React, { useState, useEffect } from 'react';
import viTexts from '../../assets/locales/vi.json';
import type { TourDisplay } from './types';
import { fetchTours, convertTourToDisplay, filterToursByType } from './api';

const PopularTours: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'domestic' | 'international'>('domestic');
  const [domesticTours, setDomesticTours] = useState<TourDisplay[]>([]);
  const [internationalTours, setInternationalTours] = useState<TourDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTours = async () => {
      try {
        setLoading(true);
        const response = await fetchTours({ limit: 10, featured: true });
        
        const domesticData = filterToursByType(response.data.tours, 'domestic');
        const internationalData = filterToursByType(response.data.tours, 'international');
        
        setDomesticTours(domesticData.map(convertTourToDisplay));
        setInternationalTours(internationalData.map(convertTourToDisplay));
      } catch (error) {
        console.error('Failed to load tours:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTours();
  }, []);

  const renderTourCard = (tour: TourDisplay, index: number) => (
    <div key={index} className="bg-white border border-gray-200 rounded overflow-hidden">
      <div className="relative">
        <img 
          src={tour.image || `https://via.placeholder.com/400x250/1e88e5/ffffff?text=${encodeURIComponent(tour.title)}`}
          alt={tour.title}
          className="w-full h-48 sm:h-full object-cover"
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

  const renderPlaceholderCard = (index: number) => (
    <div key={index} className="bg-white border border-gray-200 rounded overflow-hidden animate-pulse">
      <div className="bg-gray-300 h-48 w-full"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded mb-3"></div>
        <div className="space-y-2 mb-3">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded"></div>
        </div>
        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>
  );

  const currentTours = activeTab === 'domestic' ? domesticTours : internationalTours;

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

        {/* Tour content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => renderPlaceholderCard(index))
          ) : currentTours.length > 0 ? (
            currentTours.map((tour, index) => renderTourCard(tour, index))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              Không có tour nào
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularTours;