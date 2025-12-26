import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaStar, FaUsers, FaTicketAlt, FaFilter, FaBullseye, FaLandmark, FaTree, FaBook, FaDollarSign, FaComments, FaExchangeAlt, FaBolt } from 'react-icons/fa';

const AttractionTicketPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'Tất cả', icon: FaBullseye },
        { id: 'sunworld', name: 'Sun World', icon: FaTicketAlt },
        { id: 'vinwonders', name: 'VinWonders', icon: FaTicketAlt },
        { id: 'museum', name: 'Bảo tàng', icon: FaLandmark },
        { id: 'nature', name: 'Thiên nhiên', icon: FaTree },
        { id: 'culture', name: 'Văn hóa', icon: FaBook },
    ];

    const tickets = [
        {
            id: 1,
            title: 'Vé Sun World Ba Na Hills - Cầu Vàng',
            location: 'Đà Nẵng',
            category: 'sunworld',
            price: 850000,
            originalPrice: 1000000,
            rating: 4.8,
            reviews: 1245,
            image: '/back1.jpg',
            badge: 'Bán chạy'
        },
        {
            id: 2,
            title: 'Vé VinWonders Nha Trang',
            location: 'Nha Trang',
            category: 'vinwonders',
            price: 650000,
            originalPrice: 800000,
            rating: 4.7,
            reviews: 892,
            image: '/back2.jpg',
            badge: 'Giảm 19%'
        },
        {
            id: 3,
            title: 'Vé Sun World Fansipan Legend',
            location: 'Sapa',
            category: 'sunworld',
            price: 750000,
            originalPrice: 900000,
            rating: 4.9,
            reviews: 567,
            image: '/back3.jpg',
            badge: 'Hot'
        },
        {
            id: 4,
            title: 'Vé VinWonders Phú Quốc',
            location: 'Phú Quốc',
            category: 'vinwonders',
            price: 950000,
            originalPrice: 1200000,
            rating: 4.8,
            reviews: 1034,
            image: '/back4.jpg',
            badge: 'Giảm 21%'
        },
        {
            id: 5,
            title: 'Vé Sun World Halong Complex',
            location: 'Hạ Long',
            category: 'sunworld',
            price: 550000,
            originalPrice: 700000,
            rating: 4.6,
            reviews: 678,
            image: '/back5.jpg',
            badge: 'Ưu đãi'
        },
        {
            id: 6,
            title: 'Vé Bảo tàng Lịch sử Việt Nam',
            location: 'Hà Nội',
            category: 'museum',
            price: 40000,
            originalPrice: 50000,
            rating: 4.5,
            reviews: 234,
            image: '/back6.jpg',
            badge: null
        },
        {
            id: 7,
            title: 'Vé Tham Quan Văn Miếu Quốc Tử Giám',
            location: 'Hà Nội',
            category: 'culture',
            price: 30000,
            originalPrice: 30000,
            rating: 4.7,
            reviews: 456,
            image: '/back7.jpg',
            badge: null
        },
        {
            id: 8,
            title: 'Vé VinWonders Nam Hội An',
            location: 'Hội An',
            category: 'vinwonders',
            price: 750000,
            originalPrice: 900000,
            rating: 4.6,
            reviews: 345,
            image: '/back8.jpg',
            badge: 'Mới'
        },
    ];

    const filteredTickets = tickets.filter(ticket => {
        const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            ticket.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || ticket.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    return (
        <main className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Vé Tham Quan Sun World
                        </h1>
                        <p className="text-xl text-blue-100">
                            Đặt Vé Online - Trải Nghiệm Ngay - Không Xếp Hàng
                        </p>
                    </div>

                    {/* Search Form */}
                    <div className="bg-white rounded-xl shadow-2xl p-6 -mb-12 relative z-10 max-w-4xl mx-auto border-2 border-gray-400">
                        <div className="flex gap-4">
                            <div className="relative flex-1">
                                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Tìm địa điểm tham quan, công viên giải trí..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                                />
                            </div>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition flex items-center gap-2 shadow-lg">
                                <FaSearch />
                                Tìm vé
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Filter */}
            <section className="max-w-7xl mx-auto px-6 py-8 mt-12">
                <div className="flex items-center gap-2 mb-4">
                    <FaFilter className="text-gray-600" />
                    <span className="font-semibold text-gray-900">Lọc theo danh mục:</span>
                </div>
                <div className="flex flex-wrap gap-3">
                    {categories.map((cat) => {
                        const IconComponent = cat.icon;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                                    selectedCategory === cat.id
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-400'
                                }`}
                            >
                                <IconComponent />
                                {cat.name}
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* Tickets Grid */}
            <section className="max-w-7xl mx-auto px-6 py-8">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Vé tham quan & vui chơi
                    </h2>
                    <p className="text-gray-600">
                        Tìm thấy {filteredTickets.length} vé phù hợp
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredTickets.map((ticket) => (
                        <div
                            key={ticket.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-400 hover:border-blue-500 group"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={ticket.image}
                                    alt={ticket.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                {ticket.badge && (
                                    <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                        {ticket.badge}
                                    </div>
                                )}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                                    <div className="flex items-center gap-1 text-white text-sm">
                                        <FaMapMarkerAlt className="text-xs" />
                                        <span>{ticket.location}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-base text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition min-h-[3rem]">
                                    {ticket.title}
                                </h3>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="flex items-center gap-1">
                                        <FaStar className="text-yellow-400 text-sm" />
                                        <span className="text-sm font-semibold text-gray-900">{ticket.rating}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                                        <FaUsers className="text-xs" />
                                        <span>{ticket.reviews}</span>
                                    </div>
                                </div>
                                <div className="flex items-baseline justify-between pt-3 border-t border-gray-100">
                                    <div>
                                        {ticket.originalPrice > ticket.price && (
                                            <div className="text-xs text-gray-400 line-through mb-1">
                                                {formatPrice(ticket.originalPrice)}đ
                                            </div>
                                        )}
                                        <div className="text-xl font-bold text-blue-600">
                                            {formatPrice(ticket.price)}đ
                                        </div>
                                    </div>
                                    <Link
                                        to={`/dich-vu/ve-tham-quan/${ticket.id}`}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition flex items-center gap-1"
                                    >
                                        <FaTicketAlt />
                                        Đặt vé
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Popular Destinations */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Các địa điểm nổi bật
                    </h2>
                    <div className="grid md:grid-cols-5 gap-4">
                        {['Hạ Long', 'Đà Nẵng', 'Nha Trang', 'Đà Lạt', 'Phú Quốc'].map((location, i) => (
                            <div
                                key={i}
                                className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-center text-white hover:scale-105 transition-transform cursor-pointer shadow-lg border-2 border-blue-500"
                            >
                                <div className="flex justify-center mb-2">
                                    <FaTicketAlt className="text-3xl" />
                                </div>
                                <div className="font-bold text-lg">{location}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Lợi ích khi đặt vé online
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { title: 'Không xếp hàng', desc: 'Nhận vé ngay, không cần chờ đợi', icon: FaBolt },
                            { title: 'Giá ưu đãi', desc: 'Nhiều chương trình khuyến mãi hấp dẫn', icon: FaDollarSign },
                            { title: 'Đổi trả dễ dàng', desc: 'Chính sách đổi trả linh hoạt', icon: FaExchangeAlt },
                            { title: 'Hỗ trợ 24/7', desc: 'Tư vấn và hỗ trợ mọi lúc', icon: FaComments },
                        ].map((item, i) => {
                            const IconComponent = item.icon;
                            return (
                                <div key={i} className="text-center p-6 rounded-xl bg-white hover:bg-blue-50 transition shadow-sm border-2 border-gray-400 hover:border-blue-500">
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

export default AttractionTicketPage;
