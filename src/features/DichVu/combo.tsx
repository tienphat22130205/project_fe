import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch, FaStar, FaUsers, FaUmbrellaBeach, FaTicketAlt, FaUtensils, FaBus, FaShip, FaCar, FaDollarSign, FaLock, FaComments, FaAward } from 'react-icons/fa';

const ComboPage = () => {
    const categories = [
        { name: 'Free & Easy', icon: FaUmbrellaBeach },
        { name: 'Vé tham quan', icon: FaTicketAlt },
        { name: 'Vé ẩm thực', icon: FaUtensils },
        { name: 'City tour', icon: FaBus },
        { name: 'Du thuyền', icon: FaShip },
        { name: 'Thuê xe', icon: FaCar },
    ];

    const combos = [
        { id: 1, title: 'Combo Hạ Long 2N1D - Khách sạn 4 sao + Du thuyền', location: 'Hạ Long', price: '6.990.000', rating: 4.6, reviews: 128, image: '/back1.jpg' },
        { id: 2, title: 'Combo Đà Nẵng 3N2D - Resort bãi biển + City tour', location: 'Đà Nẵng', price: '8.500.000', rating: 4.8, reviews: 95, image: '/back2.jpg' },
        { id: 3, title: 'Combo Nha Trang 2N1D - Khách sạn view biển + Spa', location: 'Nha Trang', price: '5.990.000', rating: 4.7, reviews: 156, image: '/back3.jpg' },
        { id: 4, title: 'Combo Phú Quốc 3N2D - Resort 5 sao + Vé tham quan', location: 'Phú Quốc', price: '12.990.000', rating: 4.9, reviews: 203, image: '/back4.jpg' },
        { id: 5, title: 'Combo Đà Lạt 2N1D - Khách sạn view núi + Tour hoa', location: 'Đà Lạt', price: '4.990.000', rating: 4.5, reviews: 87, image: '/back5.jpg' },
        { id: 6, title: 'Combo Sapa 2N1D - Homestay + Trekking + Ẩm thực', location: 'Sapa', price: '5.500.000', rating: 4.6, reviews: 112, image: '/back6.jpg' },
    ];

    return (
        <main className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Combo du lịch
                        </h1>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                            Giải pháp hoàn hảo giúp bạn tiết kiệm chi phí, thuận tiện và tận hưởng trọn vẹn chuyến đi
                        </p>
                    </div>

                    {/* Categories */}
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
                        {categories.map((cat, i) => {
                            const IconComponent = cat.icon;
                            return (
                                <div
                                    key={i}
                                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition cursor-pointer border border-white/20"
                                >
                                    <div className="flex justify-center mb-2">
                                        <IconComponent className="text-3xl" />
                                    </div>
                                    <div className="text-sm font-medium">{cat.name}</div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Search Form */}
                    <div className="bg-white rounded-xl shadow-2xl p-6 -mb-12 relative z-10 border-2 border-gray-400">
                        <div className="grid md:grid-cols-5 gap-4">
                            <div className="relative">
                                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Điểm khởi hành"
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                                />
                            </div>
                            <div className="relative">
                                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Điểm đến"
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                                />
                            </div>
                            <div className="relative">
                                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="date"
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                                />
                            </div>
                            <div className="relative">
                                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="date"
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                                />
                            </div>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 shadow-lg">
                                <FaSearch />
                                Tìm combo
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Combo List */}
            <section className="max-w-7xl mx-auto px-6 py-20 mt-12">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Các combo nổi bật</h2>
                    <p className="text-gray-600">Khám phá những gói combo du lịch hấp dẫn nhất</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {combos.map((combo) => (
                        <div
                            key={combo.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={combo.image}
                                    alt={combo.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    Giá tốt
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaMapMarkerAlt className="text-gray-400 text-sm" />
                                    <span className="text-sm text-gray-600">{combo.location}</span>
                                </div>
                                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                                    {combo.title}
                                </h3>
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="flex items-center gap-1">
                                        <FaStar className="text-yellow-400" />
                                        <span className="text-sm font-semibold text-gray-900">{combo.rating}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                                        <FaUsers className="text-sm" />
                                        <span>{combo.reviews} đánh giá</span>
                                    </div>
                                </div>
                                <div className="flex items-baseline justify-between pt-3 border-t border-gray-100">
                                    <div>
                                        <span className="text-xs text-gray-500">Giá từ</span>
                                        <div className="text-2xl font-bold text-red-600">
                                            {combo.price}đ
                                        </div>
                                    </div>
                                    <Link
                                        to={`/dich-vu/combo/${combo.id}`}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition"
                                    >
                                        Xem chi tiết
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Section */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Vì sao nên chọn combo du lịch?
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { title: 'Giá tốt nhiều ưu đãi', desc: 'Ưu đãi và quà tặng hấp dẫn khi mua combo online', icon: FaDollarSign },
                            { title: 'Thanh toán an toàn', desc: 'Được bảo mật bởi tổ chức quốc tế Global Sign', icon: FaLock },
                            { title: 'Tư vấn miễn phí', desc: 'Hỗ trợ tư vấn online miễn phí 24/7', icon: FaComments },
                            { title: 'Thương hiệu uy tín', desc: 'Thương hiệu lữ hành hàng đầu Việt Nam', icon: FaAward },
                        ].map((item, i) => {
                            const IconComponent = item.icon;
                            return (
                                <div key={i} className="text-center p-6 rounded-xl bg-white">
                                    <div className="flex justify-center mb-4">
                                        <IconComponent className="text-4xl text-blue-600" />
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ComboPage;
