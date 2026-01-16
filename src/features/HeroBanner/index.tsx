import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import viTexts from '../../assets/locales/vi.json';
import { FaSearch, FaCalendarAlt, FaUser, FaChevronLeft, FaChevronRight, FaPlane, FaStar } from 'react-icons/fa';

const HeroBanner: React.FC = () => {
  // Slide carousel state
  const slides = ['/back1.jpg', '/back2.jpg', '/back3.jpg', '/back4.jpg'];
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [departDate, setDepartDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [selectingDepart, setSelectingDepart] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search suggestions with debounce
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchKeyword.trim().length < 2) {
        setSearchSuggestions([]);
        return;
      }
      try {
        const response = await fetch(`http://localhost:5000/api/tours?search=${encodeURIComponent(searchKeyword)}&limit=5`);
        if (!response.ok) return;
        const data = await response.json();
        const suggestions = data.data.tours.map((tour: { title: string }) => tour.title);
        setSearchSuggestions(suggestions);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSearchSuggestions([]);
      }
    };
    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchKeyword]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const formatDate = (date: Date | null) => {
    if (!date) return { day: '', date: '', month: '', year: '' };
    const days = ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    return {
      day: days[date.getDay()],
      date: date.getDate().toString().padStart(2, '0'),
      month: (date.getMonth() + 1).toString().padStart(2, '0'),
      year: date.getFullYear()
    };
  };

  const getDaysBetween = () => {
    if (!departDate || !returnDate) return 0;
    const diffTime = Math.abs(returnDate.getTime() - departDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleDateClick = (currentDate: Date) => {
    if (selectingDepart) {
      // Chọn ngày đi
      setDepartDate(currentDate);
      setReturnDate(null); // Reset ngày về
      setSelectingDepart(false); // Chuyển sang chọn ngày về
    } else {
      // Chọn ngày về
      if (departDate && currentDate > departDate) {
        setReturnDate(currentDate);
        setShowDatePicker(false); // Đóng calendar sau khi chọn xong
        setSelectingDepart(true); // Reset về chọn ngày đi cho lần sau
      } else {
        // Nếu chọn ngày về trước ngày đi, chọn lại ngày đi
        setDepartDate(currentDate);
        setReturnDate(null);
      }
    }
  };

  // Handle search
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchKeyword) params.append('keyword', searchKeyword);
    if (departDate) params.append('depart', departDate.toISOString());
    if (returnDate) params.append('return', returnDate.toISOString());
    params.append('adults', String(adults));
    params.append('children', String(children));

    navigate(`/search?${params.toString()}`);
  };

  const renderCalendar = (monthOffset: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, 1);
    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(date);
    const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 
                        'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const isDepart = departDate && currentDate.toDateString() === departDate.toDateString();
      const isReturn = returnDate && currentDate.toDateString() === returnDate.toDateString();
      const isBetween = departDate && returnDate && currentDate > departDate && currentDate < returnDate;
      const isPast = currentDate < today;
        const isDisabled = Boolean(!selectingDepart && departDate && currentDate <= departDate);

        days.push(
          <button
            key={day}
            onClick={() => {
              if (!(isPast || isDisabled)) {
                handleDateClick(currentDate);
              }
            }}
            disabled={!!(isPast || isDisabled)}
            className={`h-10 flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none
              ${isDepart ? 'bg-blue-500 text-white font-bold' : ''}
              ${isReturn ? 'bg-blue-500 text-white font-bold' : ''}
              ${isBetween ? 'bg-blue-100' : ''}
              ${!isDepart && !isReturn && !isBetween && !isPast && !isDisabled ? 'hover:bg-gray-100' : ''}
              ${(isPast || isDisabled) ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {day}
          </button>
        );
    }

    return (
      <div className="flex-1">
        <div className="text-center font-semibold mb-4">{monthNames[month]} {year}</div>
        <div className="grid grid-cols-7 gap-1 mb-2 text-xs font-semibold text-gray-600">
          <div className="text-center">Th 2</div>
          <div className="text-center">Th 3</div>
          <div className="text-center">Th 4</div>
          <div className="text-center">Th 5</div>
          <div className="text-center">Th 6</div>
          <div className="text-center">Th 7</div>
          <div className="text-center">CN</div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };

  const departFormatted = formatDate(departDate);
  const returnFormatted = formatDate(returnDate);
  const nightCount = getDaysBetween();

  return (
    <section className="relative w-full min-h-[50vh] md:min-h-[66vh] py-8 md:py-20 lg:py-24 flex items-center overflow-visible">
      {/* Slide Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url('${slide}')` }}
        />
      ))}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>

      {/* Previous Button - Hidden on mobile */}
      <button
        onClick={prevSlide}
        className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all focus:outline-none"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-2xl" />
      </button>

      {/* Next Button - Hidden on mobile */}
      <button
        onClick={nextSlide}
        className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all focus:outline-none"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-2xl" />
      </button>

      {/* Slide Indicators - Hidden on mobile */}
      <div className="hidden md:flex absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-30 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all focus:outline-none ${
              index === currentSlide ? 'bg-white w-6 md:w-8' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="relative container mx-auto px-4 z-20">
        <div className="max-w-6xl mx-auto md:ml-8 lg:ml-16">
          <div className="mb-4 md:mb-8 text-center md:text-left">
            {/* Main Heading - Simple and Elegant */}
            <h1 
              className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-2 md:mb-4"
              style={{ 
                fontFamily: 'Montserrat, Poppins, sans-serif',
                letterSpacing: '0.02em',
                textShadow: '2px 4px 12px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)'
              }}
            >
              Easy Trip
            </h1>
            
            {/* Subtitle - Clean and Readable */}
            <p 
              className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-medium text-white leading-relaxed mb-2 md:mb-3 flex items-center justify-center md:justify-start gap-2"
              style={{ 
                fontFamily: 'Quicksand, sans-serif',
                textShadow: '1px 2px 6px rgba(0,0,0,0.6)'
              }}
            >
              <FaPlane className="text-white flex-shrink-0" />
              <span>Đồng hành cùng bạn trên mọi chuyến</span>
            </p>
          </div>
          
          <p 
            className="hidden md:flex text-white/95 text-base md:text-lg font-normal mb-6 items-center gap-2"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              textShadow: '1px 1px 4px rgba(0,0,0,0.7)'
            }}
          >
            <FaStar className="text-yellow-400" />
            Combo khách sạn - vé máy bay - đưa đón sân bay giá tốt nhất
          </p>
          
          <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-6">
            {/* Search Input Row */}
            <div className="mb-3 sm:mb-4 relative" ref={searchRef}>
              <FaSearch className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-gray-400 text-base sm:text-xl z-10" />
              <input 
                type="text" 
                value={searchKeyword}
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder={viTexts.hero.searchPlaceholder}
                className="w-full pl-10 sm:pl-14 pr-3 sm:pr-6 py-2.5 sm:py-4 text-sm sm:text-lg border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none transition-all"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                    setShowSuggestions(false);
                  }
                }}
              />
              
              {/* Search Suggestions Dropdown */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchKeyword(suggestion);
                        setShowSuggestions(false);
                        const params = new URLSearchParams();
                        params.append('keyword', suggestion);
                        navigate(`/search?${params.toString()}`);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-center gap-3"
                    >
                      <FaSearch className="text-gray-400 text-sm flex-shrink-0" />
                      <span className="text-gray-700 text-sm line-clamp-1">{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Date and Guest Selection Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-end">
              {/* Date Picker - Combined */}
              <div className="md:col-span-7 relative">
                <div className="grid grid-cols-2 gap-2">
                  {/* Departure Date */}
                  <button 
                    onClick={() => {
                      setShowDatePicker(true);
                      setSelectingDepart(true);
                    }}
                    className={`border-2 rounded-lg sm:rounded-xl p-2 sm:p-3 hover:border-blue-500 transition-all text-left focus:outline-none
                      ${selectingDepart && showDatePicker ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}
                  >
                    <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">{departFormatted.day || 'Chọn ngày'}</div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <FaCalendarAlt className="text-gray-400 text-xs sm:text-base" />
                      <span className="font-semibold text-xs sm:text-base truncate">
                        {departDate ? `${departFormatted.date}/${departFormatted.month}` : 'Ngày đi'}
                      </span>
                    </div>
                  </button>

                  {/* Return Date */}
                  <button 
                    onClick={() => {
                      if (departDate) {
                        setShowDatePicker(true);
                        setSelectingDepart(false);
                      }
                    }}
                    className={`border-2 rounded-lg sm:rounded-xl p-2 sm:p-3 hover:border-blue-500 transition-all text-left focus:outline-none
                      ${!selectingDepart && showDatePicker ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}
                      ${!departDate ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!departDate}
                  >
                    <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">{returnFormatted.day || 'Chọn ngày'}</div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <FaCalendarAlt className="text-gray-400 text-xs sm:text-base" />
                      <span className="font-semibold text-xs sm:text-base truncate">
                        {returnDate ? `${returnFormatted.date}/${returnFormatted.month}` : 'Ngày về'}
                      </span>
                    </div>
                  </button>
                </div>

                {/* Calendar Popup */}
                {showDatePicker && (
                  <div className="fixed sm:absolute inset-4 sm:inset-auto sm:top-full sm:left-0 sm:mt-2 bg-white rounded-xl shadow-2xl p-4 sm:p-6 z-[9999] sm:w-full md:w-[700px] overflow-auto max-h-[80vh] sm:max-h-none">
                    <div className="mb-4 text-center">
                      <p className="text-sm text-gray-600">
                        {selectingDepart ? '🛫 Chọn ngày đi' : '🛬 Chọn ngày về'}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {renderCalendar(0)}
                      <div className="hidden sm:block">{renderCalendar(1)}</div>
                    </div>
                    <div className="mt-4 flex justify-between items-center pt-4 border-t">
                      <button 
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                        className="text-orange-500 hover:text-orange-600 font-semibold focus:outline-none"
                      >
                        ← Tháng trước
                      </button>
                      <button 
                        onClick={() => {
                          setShowDatePicker(false);
                          setSelectingDepart(true);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold focus:outline-none"
                      >
                        Đóng
                      </button>
                      <button 
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                        className="text-orange-500 hover:text-orange-600 font-semibold focus:outline-none"
                      >
                        Tháng sau →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Guest Picker */}
              <div className="md:col-span-3 relative">
                <button 
                  onClick={() => setShowGuestPicker(!showGuestPicker)}
                  className="w-full px-3 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl text-left hover:border-blue-500 transition-all focus:outline-none"
                >
                  <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">1 Phòng</div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <FaUser className="text-gray-400 text-xs sm:text-base" />
                    <span className="font-semibold text-xs sm:text-base">{adults} người lớn, {children} trẻ em</span>
                  </div>
                </button>
                
                {showGuestPicker && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl p-4 sm:p-6 z-[9999] w-full md:w-80">
                    <div className="space-y-4">
                      {/* Adults */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-sm sm:text-base">Người Lớn</div>
                          <div className="text-xs sm:text-sm text-gray-500">Từ 12 tuổi</div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <button 
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-gray-300 hover:border-blue-500 flex items-center justify-center focus:outline-none text-sm"
                          >
                            −
                          </button>
                          <span className="w-6 sm:w-8 text-center font-semibold text-sm sm:text-base">{adults}</span>
                          <button 
                            onClick={() => setAdults(adults + 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-gray-300 hover:border-blue-500 flex items-center justify-center focus:outline-none text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-sm sm:text-base">Trẻ em</div>
                          <div className="text-xs sm:text-sm text-gray-500">Từ 0 - 16 tuổi</div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <button 
                            onClick={() => setChildren(Math.max(0, children - 1))}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-gray-300 hover:border-blue-500 flex items-center justify-center focus:outline-none text-sm"
                          >
                            −
                          </button>
                          <span className="w-6 sm:w-8 text-center font-semibold text-sm sm:text-base">{children}</span>
                          <button 
                            onClick={() => setChildren(children + 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-gray-300 hover:border-blue-500 flex items-center justify-center focus:outline-none text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Search Button */}
              <div className="md:col-span-2">
                <button 
                  onClick={handleSearch}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold text-sm sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none"
                >
                  <FaSearch className="text-base sm:text-xl" /> Tìm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;