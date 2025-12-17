import React from 'react';

interface RelatedTour {
  id: number;
  image: string;
  badge: string;
  title: string;
  description: string;
  departure: string;
  startDate: string;
  duration: string;
  transport: string;
  price: number;
}

const RelatedTours: React.FC = () => {
  const relatedTours: RelatedTour[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
      badge: 'KHỞI HÀNH: MÙNG 2 ÂM LỊCH',
      title: 'DU XUÂN BÌNH NGÔ 2026 - NHA TRANG - ĐÀ LẠT',
      description: 'Chùm tour sự kiện, Tour Tết Âm Lịch ... Miền Trung, Nha Trang, Tây Nguyên, ...',
      departure: 'TP Hồ Chí Minh',
      startDate: '18/02/2026',
      duration: '5 ngày 4 đêm',
      transport: 'Đường bộ',
      price: 6979000,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=400&h=300&fit=crop',
      badge: 'Khởi hành: Mùng 2 Tết ÂL',
      title: 'NHA TRANG - ĐÀ LẠT',
      description: 'Chùm tour sự kiện, Tour Tết Âm Lịch ... Miền Trung, Nha Trang, Tây Nguyên, ...',
      departure: 'Cần Thơ',
      startDate: '18/02/2026',
      duration: '5 ngày 4 đêm',
      transport: 'Đường bộ',
      price: 6590000,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=300&fit=crop',
      badge: 'Khởi hành: chủ nhật',
      title: 'NHA TRANG - KHU DU LỊCH BÀ HỌ - ĐẢO HOA LAN - LÀNG YẾN...',
      description: 'Chùm tour theo thế loại, Tour định kỳ... Miền Trung, Nha Trang',
      departure: 'TP Hồ Chí Minh',
      startDate: '21/12/2025',
      duration: '4 ngày 3 đêm',
      transport: 'Đường bộ',
      price: 5579000,
    },
  ];

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-600 pl-3">
        Tour liên quan
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedTours.map((tour) => (
          <div
            key={tour.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
              {/* Badge */}
              <div className="absolute top-3 left-0 bg-red-600 text-white px-3 py-1 text-xs font-semibold">
                {tour.badge}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Title */}
              <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                {tour.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {tour.description}
              </p>

              {/* Details */}
              <div className="space-y-1 text-xs text-gray-600 mb-3">
                <p>
                  <span className="font-medium">Xuất phát:</span> {tour.departure}
                </p>
                <p>
                  <span className="font-medium">Ngày khởi hành:</span> {tour.startDate}
                </p>
                <p>
                  <span className="font-medium">Thời gian:</span> {tour.duration}
                </p>
                <p>
                  <span className="font-medium">Phương tiện di chuyển:</span> {tour.transport}
                </p>
              </div>

              {/* Price */}
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xl font-bold text-red-600">
                  {tour.price.toLocaleString('vi-VN')} đ
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedTours;
