'use client';

import { useState } from 'react';
import { FaCar, FaUser, FaPhone, FaEnvelope, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const CarRental = () => {
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

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center text-white py-32 md:py-40"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1600")',
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Chuyến Đi An Toàn - Dịch Vụ Chuyên Nghiệp
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Đội ngũ chuyên nghiệp của chúng tôi làm việc để mang lại trải nghiệm thoải mái và an toàn cho khách hàng.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                  Giới thiệu
                </h2>
                <p className="text-gray-700 text-base leading-relaxed mb-4">
                  Lữ Hành EasyTrip là đối tác uy tín cho thuê xe du lịch tại Việt Nam. Với đội ngũ xe đa dạng từ 7 chỗ, 16 chỗ, 30 chỗ đến 45 chỗ, chúng tôi cam kết mang đến cho quý khách trải nghiệm du lịch tuyệt vời nhất. Dịch vụ của chúng tôi bao gồm thuê xe đi du lịch, công tác, đưa đón sân bay và các nhu cầu khác của khách hàng.
                </p>
                <p className="text-gray-700 text-base leading-relaxed">
                  Với tinh thần chuyên nghiệp, tận tâm và bảo hiểm toàn diện, chúng tôi đảm bảo một hành trình an toàn và thoải mái cho mỗi khách hàng. Hãy để Lữ Hành EasyTrip chăm sóc mọi nhu cầu di chuyển của bạn!
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center p-8">
                <img 
                  src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" 
                  alt="Xe du lịch" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Dịch vụ của chúng tôi
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg p-8 text-center shadow-md">
              <div className="text-blue-600 text-5xl mb-6 flex justify-center">
                <FaCar />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Dịch vụ cho thuê xe đi du lịch gia đình</h3>
              <p className="text-gray-600 leading-relaxed">
                Trải nghiệm hành trình đầy thú vị cùng gia đình với các loại xe đa dạng, từ 7 chỗ đến 45 chỗ, đảm bảo thoải mái và an toàn.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 text-center shadow-md">
              <div className="text-blue-600 text-5xl mb-6 flex justify-center">
                <FaCar />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Dịch vụ cho thuê xe đi công tác</h3>
              <p className="text-gray-600 leading-relaxed">
                Đối tác đáng tin cậy cho mọi nhu cầu công tác, từ các cuộc họp quan trọng đến các sự kiện doanh nghiệp, với dịch vụ chuyên nghiệp.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 text-center shadow-md">
              <div className="text-blue-600 text-5xl mb-6 flex justify-center">
                <FaCar />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Dịch vụ cho thuê xe đưa đón sân bay</h3>
              <p className="text-gray-600 leading-relaxed">
                Tiếp đón và tiễn đưa khách hàng một cách nhanh chóng và thuận tiện, đảm bảo họ luôn đến đúng giờ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking-form" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                Đặt xe ngay
              </h2>
              <p className="text-gray-600 text-lg">
                Điền thông tin và chúng tôi sẽ liên hệ lại với bạn
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg shadow-md p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    <span className="flex items-center gap-2">
                      <FaUser className="text-gray-600" /> Họ và tên <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Nhập họ và tên"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    <span className="flex items-center gap-2">
                      <FaPhone className="text-gray-600" /> Số điện thoại <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  <span className="flex items-center gap-2">
                    <FaEnvelope className="text-gray-600" /> Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Nhập email"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  <span className="flex items-center gap-2">
                    <FaCar className="text-gray-600" /> Loại xe <span className="text-red-500">*</span>
                  </span>
                </label>
                <select
                  name="carType"
                  required
                  value={formData.carType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white"
                >
                  <option value="">Chọn loại xe</option>
                  <option value="7-seats">Xe 7 chỗ</option>
                  <option value="16-seats">Xe 16 chỗ</option>
                  <option value="30-seats">Xe 30 chỗ</option>
                  <option value="45-seats">Xe 45 chỗ</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    <span className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-600" /> Ngày đi <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="date"
                    name="pickupDate"
                    required
                    value={formData.pickupDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    <span className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-600" /> Ngày về <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="date"
                    name="returnDate"
                    required
                    value={formData.returnDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  <span className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-600" /> Điểm đến <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="destination"
                  required
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Vũng Tàu, Đà Lạt, Phan Thiết..."
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Ghi chú
                </label>
                <textarea
                  name="note"
                  rows={4}
                  value={formData.note}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Yêu cầu đặc biệt (nếu có)..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-semibold text-lg"
              >
                Gửi yêu cầu đặt xe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CarRental;
