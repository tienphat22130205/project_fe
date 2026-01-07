'use client';

import { useState } from 'react';
import { FaCar } from 'react-icons/fa';

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

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-form');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Dịch Vụ Cho Thuê Xe Du Lịch
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Lữ Hành EasyTrip - Đối tác uy tín cho thuê xe du lịch tại Việt Nam
          </p>
          <button 
            onClick={scrollToBooking}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold"
          >
            Đặt Xe Ngay
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Dịch vụ của chúng tôi
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-3xl shadow">
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Du lịch gia đình
              </h3>
              <p className="text-gray-600">
                Xe từ 7 chỗ đến 45 chỗ, đảm bảo thoải mái và an toàn cho cả gia đình.
              </p>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow">
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Đi công tác
              </h3>
              <p className="text-gray-600">
                Dịch vụ chuyên nghiệp cho các cuộc họp và sự kiện doanh nghiệp.
              </p>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow">
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Đưa đón sân bay
              </h3>
              <p className="text-gray-600">
                Tiếp đón và tiễn đưa khách hàng nhanh chóng, đúng giờ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking-form" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                Đặt Xe Ngay
              </h2>
              <p className="text-gray-600">
                Điền thông tin và chúng tôi sẽ liên hệ lại với bạn sớm nhất
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-white border-2 border-gray-200 rounded-3xl p-10 shadow-lg">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập họ và tên"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập email"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Loại xe <span className="text-red-500">*</span>
                </label>
                <select
                  name="carType"
                  required
                  value={formData.carType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn loại xe</option>
                  <option value="7-seats">Xe 7 chỗ</option>
                  <option value="16-seats">Xe 16 chỗ</option>
                  <option value="30-seats">Xe 30 chỗ</option>
                  <option value="45-seats">Xe 45 chỗ</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Ngày đi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="pickupDate"
                    required
                    value={formData.pickupDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Ngày về <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="returnDate"
                    required
                    value={formData.returnDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Điểm đến <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="destination"
                  required
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Vũng Tàu, Đà Lạt, Phan Thiết..."
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Ghi chú
                </label>
                <textarea
                  name="note"
                  rows={3}
                  value={formData.note}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Yêu cầu đặc biệt (nếu có)..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2"
              >
                <FaCar />
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
