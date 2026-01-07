'use client';

import { useState, useEffect } from 'react';
import { FaCar, FaUserFriends, FaBriefcase, FaPlane, FaStar, FaCheckCircle, FaHeart, FaShieldAlt, FaUser, FaPhone, FaEnvelope, FaCalendarAlt, FaMapMarkerAlt, FaEdit, FaLock, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CarRental = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    carType: '',
    pickupDate: '',
    returnDate: '',
    destination: '',
    note: '',
  });

  const testimonials = [
    {
      text: 'Dịch vụ của Lữ Hành EasyTrip thật sự xuất sắc! Tôi đã trải qua một hành trình du lịch vô cùng thoải mái và an toàn. Đội ngũ tài xế chuyên nghiệp, xe đẹp và sạch sẽ. Tôi hoàn toàn hài lòng và sẽ tiếp tục lựa chọn họ cho các chuyến đi tiếp theo của mình!',
      name: 'Thành Vinh',
      position: 'Trưởng phòng Vận hành',
      avatar: 'TV',
    },
    {
      text: 'Chuyến đi gia đình đến Đà Lạt của chúng tôi thật tuyệt vời! Xe rộng rãi, sạch sẽ, tài xế nhiệt tình và chu đáo. Các bé rất thích và không hề bị say xe. Giá cả hợp lý, dịch vụ chuyên nghiệp. Chắc chắn sẽ quay lại!',
      name: 'Minh Anh',
      position: 'Giáo viên',
      avatar: 'MA',
    },
    {
      text: 'Đặt xe đưa đón sân bay rất tiện lợi, tài xế đến đúng giờ và hỗ trợ xách hành lý nhiệt tình. Xe sang trọng, có wifi và nước uống miễn phí. Giá tốt hơn nhiều so với taxi thường. Highly recommended!',
      name: 'Đức Phong',
      position: 'Kỹ sư CNTT',
      avatar: 'DP',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    alert('Cảm ơn bạn! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-form');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Auto-play testimonials
  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovering, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                ⭐ Đối tác tin cậy số 1 Việt Nam
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Chuyến Đi An Toàn<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">
                Dịch Vụ Chuyên Nghiệp
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-blue-50">
              Lữ Hành EasyTrip là đối tác uy tín cho thuê xe du lịch tại Việt Nam. 
              Với đội ngũ xe đa dạng từ 7 chỗ, 16 chỗ, 30 chỗ đến 45 chỗ, chúng tôi cam kết 
              mang đến cho quý khách trải nghiệm du lịch tuyệt vời nhất.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button 
                onClick={scrollToBooking}
                className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <FaCar /> Đặt Xe Ngay
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Thành công được chứng minh qua những con số!
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chúng tôi luôn đặt sự hài lòng của khách hàng lên hàng đầu và nỗ lực không ngừng 
              để mang đến cho khách hàng giá trị tốt nhất.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: <FaUserFriends className="text-5xl" />, number: '5000+', label: 'Khách hàng hài lòng', color: 'from-blue-500 to-cyan-500' },
              { icon: <FaBriefcase className="text-5xl" />, number: '10000+', label: 'Khách hàng được tư vấn', color: 'from-purple-500 to-pink-500' },
              { icon: <FaStar className="text-5xl" />, number: '15+', label: 'Năm kinh nghiệm', color: 'from-orange-500 to-red-500' },
              { icon: <FaCar className="text-5xl" />, number: '500+', label: 'Quãng đường (1000km)', color: 'from-green-500 to-emerald-500' },
            ].map((stat, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-center">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className={`text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Giá trị của công ty
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <FaCheckCircle className="text-4xl" />,
                title: 'Chuyên nghiệp',
                description: 'Chúng tôi cam kết cung cấp dịch vụ chuyên nghiệp và chất lượng cao nhất, từ chất lượng xe đến tài xế giàu kinh nghiệm.',
                gradient: 'from-blue-500 to-cyan-500',
                bg: 'bg-blue-50',
              },
              {
                icon: <FaHeart className="text-4xl" />,
                title: 'Tận tâm',
                description: 'Sự tận tâm là điều chúng tôi luôn chú trọng, từ việc đáp ứng mọi nhu cầu của khách hàng đến việc đảm bảo mỗi hành trình diễn ra suôn sẻ và an toàn.',
                gradient: 'from-pink-500 to-rose-500',
                bg: 'bg-pink-50',
              },
              {
                icon: <FaShieldAlt className="text-4xl" />,
                title: 'Bảo hiểm',
                description: 'Chúng tôi đặt sự an tâm của khách hàng lên hàng đầu, do đó tất cả các dịch vụ của chúng tôi đều được bảo hiểm toàn diện.',
                gradient: 'from-green-500 to-emerald-500',
                bg: 'bg-green-50',
              },
            ].map((value, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="relative">
                  <div className={`w-20 h-20 ${value.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-500 shadow-md`}>
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
                
                <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${value.gradient} rounded-full opacity-10 group-hover:scale-150 transition-transform duration-700`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Dịch vụ của chúng tôi
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Đa dạng dịch vụ thuê xe phù hợp với mọi nhu cầu
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Dịch vụ cho thuê xe đi du lịch gia đình',
                description: 'Trải nghiệm hành trình đầy thú vị cùng gia đình với các loại xe đa dạng, từ 7 chỗ đến 45 chỗ, đảm bảo thoải mái và an toàn.',
                gradient: 'from-blue-500 via-blue-600 to-cyan-600',
                icon: <FaUserFriends className="text-8xl" />,
                imageSuggestion: 'Ảnh gia đình vui vẻ trên xe du lịch'
              },
              {
                title: 'Dịch vụ cho thuê xe đi công tác',
                description: 'Đối tác đáng tin cậy cho mọi nhu cầu công tác, từ các cuộc họp quan trọng đến các sự kiện doanh nghiệp, với dịch vụ chuyên nghiệp và tiện ích.',
                gradient: 'from-purple-500 via-purple-600 to-pink-600',
                icon: <FaBriefcase className="text-8xl" />,
                imageSuggestion: 'Ảnh doanh nhân trên xe limousine'
              },
              {
                title: 'Dịch vụ cho thuê xe đưa đón sân bay',
                description: 'Tiếp đón và tiễn đưa khách hàng một cách nhanh chóng và thuận tiện, đảm bảo họ luôn đến đúng giờ và không gặp bất kỳ trở ngại nào.',
                gradient: 'from-green-500 via-emerald-600 to-teal-600',
                icon: <FaPlane className="text-8xl" />,
                imageSuggestion: 'Ảnh xe đón khách tại sân bay'
              },
            ].map((service, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`relative h-64 bg-gradient-to-br ${service.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="group-hover:scale-125 transition-transform duration-500">
                      {service.icon}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
                  
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                    Phổ biến ⭐
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <button className="group/btn flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all duration-300">
                    Tìm hiểu thêm
                    <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400 italic">💡 Gợi ý ảnh: {service.imageSuggestion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Chất lượng - Mục tiêu hàng đầu
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Chất lượng là tiêu chí hàng đầu tạo nên sự khác biệt của dịch vụ của chúng tôi. 
              Từ chọn lựa xe đến chăm sóc khách hàng, chúng tôi luôn đặt chất lượng lên hàng đầu.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto relative">
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-16 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10 group"
              aria-label="Đánh giá trước"
            >
              <FaChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-16 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10 group"
              aria-label="Đánh giá tiếp theo"
            >
              <FaChevronRight className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
            </button>

            <div 
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden transition-all duration-500 min-h-[400px] flex flex-col justify-between"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="absolute -top-4 -left-4 text-9xl text-blue-100 font-serif">"</div>
              
              <div className="relative flex-1 flex flex-col justify-center">
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-2xl" />
                  ))}
                </div>
                
                <p className="text-xl md:text-2xl text-gray-700 mb-8 italic leading-relaxed text-center min-h-[180px] flex items-center justify-center">
                  {testimonials[currentTestimonial].text}
                </p>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg text-gray-800">{testimonials[currentTestimonial].name}</div>
                    <div className="text-gray-600">{testimonials[currentTestimonial].position}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-green-600 font-medium">Khách hàng đã xác thực</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10"></div>
            </div>
            
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    i === currentTestimonial ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400 w-3'
                  }`}
                  aria-label={`Chuyển đến đánh giá ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking-form" className="py-20 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                  🎉 Ưu đãi đặc biệt
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-600">
                Đặt Xe Ngay
              </h2>
              <p className="text-lg text-gray-600">
                Điền thông tin bên dưới và chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="group">
                  <label className="block text-gray-700 font-bold mb-2 group-focus-within:text-blue-600 transition-colors">
                    <span className="flex items-center gap-2">
                      <FaUser /> Họ và tên <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Nhập họ và tên"
                  />
                </div>
                <div className="group">
                  <label className="block text-gray-700 font-bold mb-2 group-focus-within:text-blue-600 transition-colors">
                    <span className="flex items-center gap-2">
                      <FaPhone /> Số điện thoại <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>
              
              <div className="mb-6 group">
                <label className="block text-gray-700 font-bold mb-2 group-focus-within:text-blue-600 transition-colors">
                  <span className="flex items-center gap-2">
                    <FaEnvelope /> Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Nhập email"
                />
              </div>

              <div className="mb-6 group">
                <label className="block text-gray-700 font-bold mb-2 group-focus-within:text-blue-600 transition-colors">
                  <span className="flex items-center gap-2">
                    <FaCar /> Loại xe <span className="text-red-500">*</span>
                  </span>
                </label>
                <select
                  name="carType"
                  required
                  value={formData.carType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
                >
                  <option value="">Chọn loại xe</option>
                  <option value="7-seats">🚙 Xe 7 chỗ - Phù hợp gia đình nhỏ</option>
                  <option value="16-seats">🚐 Xe 16 chỗ - Nhóm bạn, đoàn nhỏ</option>
                  <option value="30-seats">🚌 Xe 30 chỗ - Du lịch đoàn</option>
                  <option value="45-seats">🚍 Xe 45 chỗ - Đoàn lớn</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="group">
                  <label className="block text-gray-700 font-bold mb-2 group-focus-within:text-blue-600 transition-colors">
                    <span className="flex items-center gap-2">
                      <FaCalendarAlt /> Ngày đi <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="date"
                    name="pickupDate"
                    required
                    value={formData.pickupDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="group">
                  <label className="block text-gray-700 font-bold mb-2 group-focus-within:text-blue-600 transition-colors">
                    <span className="flex items-center gap-2">
                      <FaCalendarAlt /> Ngày về <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="date"
                    name="returnDate"
                    required
                    value={formData.returnDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="mb-6 group">
                <label className="block text-gray-700 font-bold mb-2 group-focus-within:text-blue-600 transition-colors">
                  <span className="flex items-center gap-2">
                    <FaMapMarkerAlt /> Điểm đến <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="destination"
                  required
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Vũng Tàu, Đà Lạt, Phan Thiết..."
                />
              </div>

              <div className="mb-8 group">
                <label className="block text-gray-700 font-bold mb-2 group-focus-within:text-blue-600 transition-colors">
                  <span className="flex items-center gap-2">
                    <FaEdit /> Ghi chú
                  </span>
                </label>
                <textarea
                  name="note"
                  rows={4}
                  value={formData.note}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Yêu cầu đặc biệt (nếu có)..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <FaCar />
                <span>Gửi yêu cầu đặt xe</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                  <FaLock /> Thông tin của bạn được bảo mật tuyệt đối
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CarRental;
