import React, { useState, useEffect, useRef } from 'react';
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
  
  // Refs for animated underline
  const tabsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const regionTabsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [regionUnderlineStyle, setRegionUnderlineStyle] = useState({ left: 0, width: 0 });

  // Update underline position for main tabs
  useEffect(() => {
    const activeButton = tabsRef.current[activeTab];
    if (activeButton) {
      const parentRect = activeButton.parentElement?.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      if (parentRect) {
        setUnderlineStyle({
          left: buttonRect.left - parentRect.left,
          width: buttonRect.width,
        });
      }
    }
  }, [activeTab]);

  // Update underline position for region tabs
  useEffect(() => {
    const activeButton = regionTabsRef.current[activeRegion];
    if (activeButton) {
      const parentRect = activeButton.parentElement?.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      if (parentRect) {
        setRegionUnderlineStyle({
          left: buttonRect.left - parentRect.left,
          width: buttonRect.width,
        });
      }
    }
  }, [activeRegion, regions]);

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
    // Navigate to province detail page with slug
    navigate(`/du-lich/${provinceSlug}`);
  };

  const handleCountryClick = (countrySlug: string) => {
    // Navigate to country detail page with slug
    navigate(`/du-lich/${countrySlug}`);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">{viTexts.destinations.title}</h2>
        <p className="text-center text-gray-600 mb-8">{viTexts.destinations.description}</p>
        
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="relative inline-flex gap-8">
            {/* Animated underline */}
            <span
              className="absolute bottom-0 h-1 bg-blue-600 transition-all duration-300 ease-out"
              style={{
                left: `${underlineStyle.left}px`,
                width: `${underlineStyle.width}px`,
              }}
            />
            
            <button 
              ref={(el) => { tabsRef.current['domestic'] = el; }}
              className={`relative px-2 py-3 text-lg font-semibold transition-all duration-300 focus:outline-none ${
                activeTab === 'domestic' 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('domestic')}
            >
              {viTexts.destinations.tabs.domestic}
            </button>
            <button 
              ref={(el) => { tabsRef.current['international'] = el; }}
              className={`relative px-2 py-3 text-lg font-semibold transition-all duration-300 focus:outline-none ${
                activeTab === 'international' 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('international')}
            >
              {viTexts.destinations.tabs.international}
            </button>
          </div>
        </div>

        {activeTab === 'domestic' && (
          <>
            {/* Region filters */}
            <div className="flex justify-center mb-8">
              <div className="relative inline-flex flex-wrap justify-center gap-6">
                {/* Animated underline for regions */}
                <span
                  className="absolute bottom-0 h-1 bg-blue-600 transition-all duration-300 ease-out"
                  style={{
                    left: `${regionUnderlineStyle.left}px`,
                    width: `${regionUnderlineStyle.width}px`,
                  }}
                />
                
                {loading && regions.length === 0 ? (
                  <p className="text-gray-500 px-4 py-2">Đang tải danh sách miền...</p>
                ) : error ? (
                  <p className="text-red-500 px-4 py-2">{error}</p>
                ) : (
                  regions.map((region) => (
                    <button
                      key={region._id}
                      ref={(el) => { regionTabsRef.current[region.slug] = el; }}
                      className={`relative px-2 py-2 text-base font-semibold transition-all duration-300 focus:outline-none ${
                        activeRegion === region.slug 
                          ? 'text-gray-900' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                      onClick={() => setActiveRegion(region.slug)}
                    >
                      {region.name} ({region.tourCount})
                    </button>
                  ))
                )}
              </div>
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
                        className="w-full h-40 object-cover"
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
                        className="w-full h-40 object-cover"
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
