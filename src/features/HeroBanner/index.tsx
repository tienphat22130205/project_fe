import React, { useState, useEffect } from 'react';
import viTexts from '../../assets/locales/vi.json';
import { FaSearch, FaCalendarAlt, FaUser, FaChevronLeft, FaChevronRight, FaPlane, FaStar } from 'react-icons/fa';

const HeroBanner: React.FC = () => {
  // Slide carousel state
  const slides = ['/back1.jpg', '/back2.jpg', '/back3.jpg', '/back4.jpg'];
  const [currentSlide, setCurrentSlide] = useState(0);

  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [departDate, setDepartDate] = useState<Date | null>(new Date(2025, 11, 17));
  const [returnDate, setReturnDate] = useState<Date | null>(new Date(2025, 11, 18));
  const [selectingDepart, setSelectingDepart] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11, 1));

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

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
    <section className="relative w-full min-h-[66vh] py-12 md:py-20 lg:py-24 flex items-center overflow-visible">
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

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all focus:outline-none"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-2xl" />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all focus:outline-none"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-2xl" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all focus:outline-none ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="relative container mx-auto px-4 z-20">
        <div className="max-w-6xl mx-auto ml-0 md:ml-8 lg:ml-16">
          <div className="mb-8">
            {/* Main Heading - Simple and Elegant */}
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-left leading-tight mb-4"
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
              className="text-2xl md:text-3xl font-medium text-white leading-relaxed mb-3 flex items-center gap-3"
              style={{ 
                fontFamily: 'Quicksand, sans-serif',
                textShadow: '1px 2px 6px rgba(0,0,0,0.6)'
              }}
            >
              <FaPlane className="text-white" />
              Đồng hành cùng bạn trên mọi chuyến
            </p>
          </div>
          
          <p 
            className="text-white/95 text-base md:text-lg font-normal mb-6 flex items-center gap-2"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              textShadow: '1px 1px 4px rgba(0,0,0,0.7)'
            }}
          >
            <FaStar className="text-yellow-400" />
            Combo khách sạn - vé máy bay - đưa đón sân bay giá tốt nhất
          </p>
          
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
            {/* Search Input Row */}
            <div className="mb-4 relative">
              <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input 
                type="text" 
                placeholder={viTexts.hero.searchPlaceholder}
                className="w-full pl-14 pr-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Date and Guest Selection Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              {/* Date Picker - Combined */}
              <div className="md:col-span-7 relative">
                <div className="grid grid-cols-7 gap-2">
                  {/* Departure Date */}
                  <button 
                    onClick={() => {
                      setShowDatePicker(true);
                      setSelectingDepart(true);
                    }}
                    className={`col-span-3 border-2 rounded-xl p-3 hover:border-blue-500 transition-all text-left focus:outline-none
                      ${selectingDepart && showDatePicker ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}
                  >
                    <div className="text-xs text-gray-500 mb-1">{departFormatted.day || 'Thứ tư'}</div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" />
                      <span className="font-semibold">
                        {departDate ? `${departFormatted.date}-${departFormatted.month}-${departFormatted.year}` : 'Chọn ngày đi'}
                      </span>
                    </div>
                  </button>

                  {/* Night Counter */}
                  <div className="col-span-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm font-semibold">{nightCount || 0}</div>
                      <div className="text-xs text-gray-400">🌙</div>
                    </div>
                  </div>

                  {/* Return Date */}
                  <button 
                    onClick={() => {
                      if (departDate) {
                        setShowDatePicker(true);
                        setSelectingDepart(false);
                      }
                    }}
                    className={`col-span-3 border-2 rounded-xl p-3 hover:border-blue-500 transition-all text-left focus:outline-none
                      ${!selectingDepart && showDatePicker ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}
                      ${!departDate ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!departDate}
                  >
                    <div className="text-xs text-gray-500 mb-1">{returnFormatted.day || 'Thứ năm'}</div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" />
                      <span className="font-semibold">
                        {returnDate ? `${returnFormatted.date}-${returnFormatted.month}-${returnFormatted.year}` : 'Chọn ngày về'}
                      </span>
                    </div>
                  </button>
                </div>

                {/* Calendar Popup */}
                {showDatePicker && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl p-6 z-[9999] w-full md:w-[700px]">
                    <div className="mb-4 text-center">
                      <p className="text-sm text-gray-600">
                        {selectingDepart ? '🛫 Chọn ngày đi' : '🛬 Chọn ngày về'}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      {renderCalendar(0)}
                      {renderCalendar(1)}
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-left hover:border-blue-500 transition-all focus:outline-none"
                >
                  <div className="text-xs text-gray-500 mb-1">1 Phòng</div>
                  <div className="flex items-center gap-2">
                    <FaUser className="text-gray-400" />
                    <span className="font-semibold">{adults} người lớn, {children} trẻ em</span>
                  </div>
                </button>
                
                {showGuestPicker && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl p-6 z-[9999] w-full md:w-80">
                    <div className="space-y-4">
                      {/* Adults */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">Người Lớn</div>
                          <div className="text-sm text-gray-500">Từ 12 tuổi</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                            className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-blue-500 flex items-center justify-center focus:outline-none"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-semibold">{adults}</span>
                          <button 
                            onClick={() => setAdults(adults + 1)}
                            className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-blue-500 flex items-center justify-center focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">Trẻ em</div>
                          <div className="text-sm text-gray-500">Từ 0 - 16 tuổi</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setChildren(Math.max(0, children - 1))}
                            className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-blue-500 flex items-center justify-center focus:outline-none"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-semibold">{children}</span>
                          <button 
                            onClick={() => setChildren(children + 1)}
                            className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-blue-500 flex items-center justify-center focus:outline-none"
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
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none">
                  <FaSearch className="text-xl" /> Tìm
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