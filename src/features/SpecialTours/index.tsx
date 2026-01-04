import React from 'react';
import { useNavigate } from 'react-router-dom';

const SpecialTours: React.FC = () => {
  const navigate = useNavigate();

  const tours = [
    {
      title: 'Tour Mùa Hoa Anh Đào',
      image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&q=80',
      link: '/tour-mua-hoa-anh-dao'
    },
    {
      title: 'Tour Tết Nguyên Đán 2026',
      image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=400&q=80',
      link: '/tour-mua-hoa-anh-dao'
    },
    {
      title: 'Tour Last Minutes',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80',
      link: '/tour-mua-hoa-anh-dao'
    },
    {
      title: 'Tour Lễ 30/4',
      image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&q=80',
      link: '/tour-mua-hoa-anh-dao'
    }
  ];

  const handleTourClick = (link: string) => {
    navigate(link);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-12 uppercase">
          CHÙM TOUR SỰ KIỆN ĐẶC BIỆT
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {tours.map((tour, index) => (
            <div 
              key={index} 
              onClick={() => handleTourClick(tour.link)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={tour.image} 
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base md:text-lg font-bold text-blue-600 text-center">{tour.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialTours;