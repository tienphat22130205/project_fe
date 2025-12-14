'use client';

import { useState } from 'react';

export default function ThueXePage() {
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
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Chuyến Đi An Toàn - Dịch Vụ Chuyên Nghiệp</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Lữ Hành Saigontourist là đối tác uy tín cho thuê xe du lịch tại Việt Nam. 
            Với đội ngũ xe đa dạng từ 7 chỗ, 16 chỗ, 30 chỗ đến 45 chỗ, chúng tôi cam kết 
            mang đến cho quý khách trải nghiệm du lịch tuyệt vời nhất.
          </p>
          <button 
            onClick={scrollToBooking}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Đặt Xe Ngay
          </button>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Thành công được chứng minh qua những con số!
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Chúng tôi luôn đặt sự hài lòng của khách hàng lên hàng đầu và nỗ lực không ngừng 
            để mang đến cho khách hàng giá trị tốt nhất.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">5000+</div>
              <div className="text-gray-600">Khách hàng hài lòng</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">10000+</div>
              <div className="text-gray-600">Khách hàng được tư vấn</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600">Năm kinh nghiệm</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Quãng đường (1000km)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Giá trị của công ty</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Chuyên nghiệp</h3>
              <p className="text-gray-600">
                Chúng tôi cam kết cung cấp dịch vụ chuyên nghiệp và chất lượng cao nhất, 
                từ chất lượng xe đến tài xế giàu kinh nghiệm.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Tận tâm</h3>
              <p className="text-gray-600">
                Sự tận tâm là điều chúng tôi luôn chú trọng, từ việc đáp ứng mọi nhu cầu của 
                khách hàng đến việc đảm bảo mỗi hành trình diễn ra suôn sẻ và an toàn.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Bảo hiểm</h3>
              <p className="text-gray-600">
                Chúng tôi đặt sự an tâm của khách hàng lên hàng đầu, do đó tất cả các dịch vụ 
                của chúng tôi đều được bảo hiểm toàn diện.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Dịch vụ của chúng tôi</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Dịch vụ cho thuê xe đi du lịch gia đình</h3>
                <p className="text-gray-600 mb-4">
                  Trải nghiệm hành trình đầy thú vị cùng gia đình với các loại xe đa dạng, 
                  từ 7 chỗ đến 45 chỗ, đảm bảo thoải mái và an toàn.
                </p>
                <button className="text-blue-600 font-semibold hover:underline">Tìm hiểu thêm →</button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-green-400 to-green-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Dịch vụ cho thuê xe đi công tác</h3>
                <p className="text-gray-600 mb-4">
                  Đối tác đáng tin cậy cho mọi nhu cầu công tác, từ các cuộc họp quan trọng đến 
                  các sự kiện doanh nghiệp, với dịch vụ chuyên nghiệp và tiện ích.
                </p>
                <button className="text-blue-600 font-semibold hover:underline">Tìm hiểu thêm →</button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Dịch vụ cho thuê xe đưa đón sân bay</h3>
                <p className="text-gray-600 mb-4">
                  Tiếp đón và tiễn đưa khách hàng một cách nhanh chóng và thuận tiện, 
                  đảm bảo họ luôn đến đúng giờ và không gặp bất kỳ trở ngại nào.
                </p>
                <button className="text-blue-600 font-semibold hover:underline">Tìm hiểu thêm →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Chất lượng - Mục tiêu hàng đầu</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Chất lượng là tiêu chí hàng đầu tạo nên sự khác biệt của dịch vụ của chúng tôi. 
            Từ chọn lựa xe đến chăm sóc khách hàng, chúng tôi luôn đặt chất lượng lên hàng đầu.
          </p>
          <div className="max-w-3xl mx-auto bg-blue-50 rounded-lg p-8">
            <div className="text-4xl text-blue-600 mb-4">"</div>
            <p className="text-lg text-gray-700 mb-6 italic">
              Dịch vụ của Lữ Hành EasyTrip thật sự xuất sắc! Tôi đã trải qua một hành trình 
              du lịch vô cùng thoải mái và an toàn. Đội ngũ tài xế chuyên nghiệp, xe đẹp và sạch sẽ. 
              Tôi hoàn toàn hài lòng và sẽ tiếp tục lựa chọn họ cho các chuyến đi tiếp theo của mình!
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                TV
              </div>
              <div className="ml-4">
                <div className="font-semibold">Thành Vinh</div>
                <div className="text-gray-600 text-sm">Trưởng phòng Vận hành</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking-form" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Đặt Xe Ngay</h2>
            <p className="text-center text-gray-600 mb-8">
              Điền thông tin bên dưới và chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất
            </p>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập email"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Loại xe <span className="text-red-500">*</span>
                </label>
                <select
                  name="carType"
                  required
                  value={formData.carType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    Ngày đi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="pickupDate"
                    required
                    value={formData.pickupDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Điểm đến <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="destination"
                  required
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập điểm đến"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Ghi chú</label>
                <textarea
                  name="note"
                  rows={4}
                  value={formData.note}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập ghi chú (nếu có)"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Gửi yêu cầu đặt xe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
