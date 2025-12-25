import { Link } from 'react-router-dom';

const TourCategories = () => {
  const categories = [
    {
      id: 1,
      title: 'Tour Mùa Hoa Anh Đào',
      image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&h=300&fit=crop',
      bgColor: 'bg-pink-50',
      link: '/vi/tours/mua-hoa-anh-dao'
    },
    {
      id: 2,
      title: 'Tour Tết Nguyên Đán 2026',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop',
      bgColor: 'bg-red-50',
      link: '/vi/tours/tet-nguyen-dan'
    },
    {
      id: 3,
      title: 'Tour Tết Dương Lịch 2026',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=300&fit=crop',
      bgColor: 'bg-yellow-50',
      link: '/vi/tours/tet-duong-lich'
    },
    {
      id: 4,
      title: 'Tour Việt Kiều',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
      bgColor: 'bg-green-50',
      link: '/vi/tours/viet-kieu'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3" style={{ color: 'rgb(0, 123, 193)' }}>
            CHÙM TOUR SỰ KIỆN ĐẶC BIỆT
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="group block"
            >
              <div className="text-center">
                {/* Image Container */}
                <div className={`${category.bgColor} rounded-2xl overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-105`}>
                  <img 
                    src={category.image}
                    alt={category.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourCategories;
