import { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaClock, FaPhone, FaEnvelope, FaStar } from 'react-icons/fa';

const carTypes = [
  {
    id: 1,
    name: "Xe 4 chỗ",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&q=80",
    seats: 4,
    price: 800000,
    features: ["Điều hòa", "Tài xế kinh nghiệm", "Nước uống miễn phí"],
    rating: 4.8
  },
  {
    id: 2,
    name: "Xe 7 chỗ",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500&q=80",
    seats: 7,
    price: 1200000,
    features: ["Điều hòa", "Tài xế kinh nghiệm", "Nước uống miễn phí", "Wifi"],
    rating: 4.9
  },
  {
    id: 3,
    name: "Xe 16 chỗ",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=500&q=80",
    seats: 16,
    price: 2000000,
    features: ["Điều hòa", "Tài xế kinh nghiệm", "Nước uống miễn phí", "Wifi", "Karaoke"],
    rating: 4.7
  },
  {
    id: 4,
    name: "Xe Limousine",
    image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=500&q=80",
    seats: 9,
    price: 1800000,
    features: ["Ghế massage", "Điều hòa cao cấp", "Wifi", "Nước uống", "Tài xế VIP"],
    rating: 5.0
  },
  {
    id: 5,
    name: "Xe 29 chỗ",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&q=80",
    seats: 29,
    price: 3500000,
    features: ["Điều hòa", "Tài xế kinh nghiệm", "Nước uống miễn phí", "Wifi", "Karaoke", "Tủ lạnh"],
    rating: 4.8
  },
  {
    id: 6,
    name: "Xe 45 chỗ",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&q=80",
    seats: 45,
    price: 5000000,
    features: ["Điều hòa", "Tài xế kinh nghiệm", "Nước uống miễn phí", "Wifi", "Karaoke", "Tủ lạnh", "WC"],
    rating: 4.9
  }
];

export default function ThueXePage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pickupLocation: '',
    destination: '',
    pickupDate: '',
    pickupTime: '',
    carType: '',
    numberOfDays: 1,
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking data:', formData);
    alert('Cảm ơn bạn đã đặt xe! Chúng tôi sẽ liên hệ với bạn sớm.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-800 text-white py-24">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)',
          }}></div>
        </div>
        {/* Animated Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Dịch Vụ Thuê Xe Du Lịch
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-blue-100 font-light">
              Đa dạng loại xe • Tài xế kinh nghiệm • Giá cả cạnh tranh
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-base">
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 shadow-lg hover:bg-white/30 transition-all">
                <FaClock className="w-5 h-5" />
                <span className="font-medium">Sẵn sàng 24/7</span>
              </div>
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 shadow-lg hover:bg-white/30 transition-all">
                <FaUsers className="w-5 h-5" />
                <span className="font-medium">Tài xế chuyên nghiệp</span>
              </div>
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 shadow-lg hover:bg-white/30 transition-all">
                <FaStar className="w-5 h-5 " />
                <span className="font-medium">Đánh giá 4.8/5</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Car Types Section */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Các Loại Xe
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Đa dạng các loại xe phù hợp với mọi nhu cầu của bạn
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {carTypes.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{car.name}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <FaUsers className="w-5 h-5" />
                    <span>{car.seats} chỗ ngồi</span>
                  </div>
                  <div className="space-y-2 mb-4">
                    {car.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-3xl font-bold text-blue-600">
                          {car.price.toLocaleString('vi-VN')}đ
                        </span>
                        <span className="text-gray-500 text-sm ml-2">/ngày</span>
                      </div>
                      <button
                        onClick={() => setFormData({ ...formData, carType: car.name })}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Chọn xe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
              Đặt Xe Ngay
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Điền thông tin để chúng tôi liên hệ và tư vấn
            </p>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0123456789"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Loại xe <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="carType"
                    required
                    value={formData.carType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Chọn loại xe</option>
                    {carTypes.map(car => (
                      <option key={car.id} value={car.name}>{car.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Điểm đón <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="pickupLocation"
                      required
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Địa chỉ đón"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Điểm đến <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="destination"
                      required
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Điểm đến"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Ngày đón <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      name="pickupDate"
                      required
                      value={formData.pickupDate}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Giờ đón <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="time"
                      name="pickupTime"
                      required
                      value={formData.pickupTime}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Số ngày thuê
                  </label>
                  <input
                    type="number"
                    name="numberOfDays"
                    min="1"
                    value={formData.numberOfDays}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Ghi chú thêm
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Yêu cầu đặc biệt, hành lý, số lượng hành khách..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Đặt Xe Ngay
              </button>

              <p className="text-center text-gray-500 text-sm mt-4">
                Bằng việc đặt xe, bạn đồng ý với{' '}
                <a href="#" className="text-blue-600 hover:underline">điều khoản dịch vụ</a>
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Tại Sao Chọn Chúng Tôi?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Những lý do khiến khách hàng tin tưởng và lựa chọn dịch vụ của chúng tôi
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaClock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Đúng Giờ</h3>
              <p className="text-gray-600">
                Xe đến đúng giờ, không để bạn chờ đợi
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaUsers className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Tài Xế Chuyên Nghiệp</h3>
              <p className="text-gray-600">
                Đội ngũ tài xế giàu kinh nghiệm, thân thiện
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaStar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Xe Mới, Sạch Sẽ</h3>
              <p className="text-gray-600">
                Xe đời mới, được bảo dưỡng định kỳ
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaPhone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Hỗ Trợ 24/7</h3>
              <p className="text-gray-600">
                Luôn sẵn sàng phục vụ mọi lúc mọi nơi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Cần Tư Vấn?</h2>
          <p className="text-xl mb-8">
            Liên hệ ngay với chúng tôi để được hỗ trợ tốt nhất
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="tel:1900xxxx"
              className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
            >
              <FaPhone className="w-5 h-5" />
              <span>1900 xxxx</span>
            </a>
            <a
              href="mailto:support@example.com"
              className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
            >
              <FaEnvelope className="w-5 h-5" />
              <span>support@example.com</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
