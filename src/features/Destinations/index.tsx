import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import viTexts from '../../assets/locales/vi.json';
import { getRegions, getProvincesByRegion, getCountries } from './server/api';
import type { Region, Province, Country } from './server/types';

const Destinations: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'domestic' | 'international'>('domestic');
  const [regions, setRegions] = useState<Region[]>([]);
  const [activeRegion, setActiveRegion] = useState<string>('');
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch regions on component mount
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        setLoading(true);
        const response = await getRegions();
        setRegions(response.data.regions);
        // Set first region as active by default
        if (response.data.regions.length > 0) {
          setActiveRegion(response.data.regions[0].slug);
        }
      } catch (err) {
        console.error('Error fetching regions:', err);
        setError('Không thể tải danh sách miền');
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'domestic') {
      fetchRegions();
    }
  }, [activeTab]);

  // Fetch provinces when active region changes
  useEffect(() => {
    const fetchProvinces = async () => {
      if (!activeRegion) return;
      
      try {
        setLoading(true);
        const response = await getProvincesByRegion(activeRegion);
        setProvinces(response.data.provinces);
      } catch (err) {
        console.error('Error fetching provinces:', err);
        setError('Không thể tải danh sách tỉnh');
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'domestic' && activeRegion) {
      fetchProvinces();
    }
  }, [activeRegion, activeTab]);

  // Fetch countries when international tab is active
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await getCountries();
        setCountries(response.data.countries);
      } catch (err) {
        console.error('Error fetching countries:', err);
        setError('Không thể tải danh sách quốc gia');
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'international') {
      fetchCountries();
    }
  }, [activeTab]);

  const handleProvinceClick = (provinceSlug: string) => {
    // Navigate to tours page with province slug
    navigate(`/tours?province=${provinceSlug}`);
  };

  const handleCountryClick = (countrySlug: string) => {
    // Navigate to tours page with country slug
    navigate(`/tours?country=${countrySlug}`);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">{viTexts.destinations.title}</h2>
        <p className="text-center text-gray-600 mb-8">{viTexts.destinations.description}</p>
        
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-6">
          <button 
            className={`px-6 py-2 rounded-full font-semibold transition-all focus:outline-none ${
              activeTab === 'domestic' 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('domestic')}
          >
            {viTexts.destinations.tabs.domestic}
          </button>
          <button 
            className={`px-6 py-2 rounded-full font-semibold transition-all focus:outline-none ${
              activeTab === 'international' 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('international')}
          >
            {viTexts.destinations.tabs.international}
          </button>
        </div>

        {activeTab === 'domestic' && (
          <>
            {/* Region filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {loading && regions.length === 0 ? (
                <p className="text-gray-500">Đang tải danh sách miền...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                regions.map((region) => (
                  <button
                    key={region._id}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none ${
                      activeRegion === region.slug 
                        ? 'bg-orange-500 text-white shadow-md' 
                        : 'bg-white text-gray-700 hover:bg-orange-50'
                    }`}
                    onClick={() => setActiveRegion(region.slug)}
                  >
                    {region.name} ({region.tourCount})
                  </button>
                ))
              )}
            </div>

            {/* Provinces Grid */}
            {loading && provinces.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Đang tải danh sách tỉnh...</p>
              </div>
            ) : provinces.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {provinces.map((province) => (
                  <div 
                    key={province._id} 
                    className="group cursor-pointer"
                    onClick={() => handleProvinceClick(province.slug)}
                  >
                    <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                      <img 
                        src={province.thumbnailImage || province.image}
                        alt={province.name}
                        className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://via.placeholder.com/300x200/1e88e5/ffffff?text=${encodeURIComponent(province.name)}`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-3 w-full">
                          <h3 className="text-white font-bold text-lg">{province.name}</h3>
                          <p className="text-white/80 text-sm">{province.tourCount} tour</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Không có tỉnh nào trong miền này</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'international' && (
          <>
            {loading && countries.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Đang tải danh sách quốc gia...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500">{error}</p>
              </div>
            ) : countries.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {countries.map((country) => (
                  <div 
                    key={country._id} 
                    className="group cursor-pointer"
                    onClick={() => handleCountryClick(country.slug)}
                  >
                    <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                      <img 
                        src={country.thumbnailImage || country.image}
                        alt={country.name}
                        className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://via.placeholder.com/300x200/1e88e5/ffffff?text=${encodeURIComponent(country.name)}`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-3 w-full">
                          <h3 className="text-white font-bold text-lg">{country.name}</h3>
                          <p className="text-white/80 text-sm">{country.tourCount} tour</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Không có quốc gia nào</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Destinations;