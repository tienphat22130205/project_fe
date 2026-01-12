'use client';

import { FaDollarSign, FaUserTie, FaCheckCircle, FaPhone, FaShip } from 'react-icons/fa';

const WorkAbroad = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center text-white py-32 md:py-40"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1600")',
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Chúng tôi kiến tạo cơ hội, bạn an tâm gắn bó dài lâu
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            "Đội ngũ nhân viên chuyên nghiệp, giàu kinh nghiệm của chúng tôi cam kết tối ưu hóa lộ trình và hiệu quả chi phí tuyển dụng, đáp ứng tiêu chuẩn hàng đầu trong ngành dịch vụ."
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                  Về chúng tôi
                </h2>
                <p className="text-gray-700 text-base leading-relaxed mb-4">
                  Là một công ty hàng đầu trong lĩnh vực du lịch, Công ty Dịch vụ Lữ hành EasyTrip luôn tiên phong trong sáng tạo và khẳng định vị thế dẫn đầu về chất lượng sản phẩm. Chính vì vậy, chúng tôi mang đến cơ hội việc làm dành riêng cho thuyền viên trên các tàu du lịch quốc tế thông qua Trung tâm Du học và Việc làm Ngoài nước.
                </p>
                <p className="text-gray-700 text-base leading-relaxed">
                  Với đội ngũ tư vấn giàu kinh nghiệm, chúng tôi cam kết mang lại mức thu nhập hấp dẫn và môi trường làm việc quốc tế năng động. Hãy đến với Trung tâm Du học và Việc làm Ngoài nước EasyTrip để mở ra cánh cửa nghề nghiệp mới và khám phá cuộc sống thú vị trên biển.
                </p>
              </div>
              <div className="relative h-64 md:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800" 
                  alt="Thuyền viên" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Thành công được chứng minh qua những con số!
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Chúng tôi luôn đặt sự hài lòng của khách hàng lên hàng đầu và nỗ lực không ngừng để mang đến cho khách hàng giá trị tốt nhất. Chúng tôi tự hào có những thành tựu đáng kể được chứng minh qua những con số ấn tượng.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-5xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-gray-700 font-semibold">Thuyền viên</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-5xl font-bold text-blue-600 mb-2">1000+</div>
              <p className="text-gray-700 font-semibold">Hồ sơ tuyển dụng</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-5xl font-bold text-blue-600 mb-2">10+</div>
              <p className="text-gray-700 font-semibold">Năm kinh nghiệm</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-5xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-gray-700 font-semibold">Hãng tàu</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Giá trị của công ty
            </h2>
            <p className="text-gray-700 text-lg max-w-4xl mx-auto leading-relaxed">
              Chào đón bạn gia nhập đội ngũ thuyền viên trẻ Việt Nam trên những con tàu viễn dương. Mặc dù công việc đòi hỏi bạn phải sống xa nhà và làm việc trong môi trường đa quốc gia, nhưng đó chính là cơ hội nghề nghiệp hấp dẫn, mở ra cánh cửa khám phá thế giới và những chân trời mới tại Á, Âu. Công ty Dịch vụ Lữ hành EasyTrip tự hào là đại lý tuyển dụng chính thức tại Việt Nam của các hãng tàu quốc tế.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mt-12">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl">
                <FaShip />
              </div>
              <p className="font-semibold text-gray-800">Costa Cruise</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl">
                <FaShip />
              </div>
              <p className="font-semibold text-gray-800">Royal Caribbean</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl">
                <FaShip />
              </div>
              <p className="font-semibold text-gray-800">Carnival Cruise</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl">
                <FaShip />
              </div>
              <p className="font-semibold text-gray-800">MSC Cruise</p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitments Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Cam kết của chúng tôi
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="text-blue-600 text-4xl mb-4">
                <FaCheckCircle />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Bảo chứng bởi thương hiệu 50 năm</h3>
              <p className="text-gray-600 leading-relaxed">
                50 năm kinh nghiệm – EasyTrip đồng hành cùng hàng triệu hành trình đáng nhớ
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="text-blue-600 text-4xl mb-4">
                <FaUserTie />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Tư vấn 1:1</h3>
              <p className="text-gray-600 leading-relaxed">
                Không chung chung, không máy móc – mỗi khách hàng là một lộ trình riêng biệt.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="text-blue-600 text-4xl mb-4">
                <FaCheckCircle />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Cam kết rõ ràng</h3>
              <p className="text-gray-600 leading-relaxed">
                Cam kết rõ ràng từ giá cả đến chất lượng – không phí ẩn. EasyTrip đồng hành cùng bạn bằng sự rõ ràng và uy tín.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="text-blue-600 text-4xl mb-4">
                <FaUserTie />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Huấn luyện phỏng vấn</h3>
              <p className="text-gray-600 leading-relaxed">
                Rèn phong thái – luyện câu trả lời – tăng cơ hội trúng tuyển.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="text-blue-600 text-4xl mb-4">
                <FaDollarSign />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Thu nhập vững chải, không lo đào thải</h3>
              <p className="text-gray-600 leading-relaxed">
                Cơ hội nghề nghiệp ổn định, mức lương rõ ràng – bảo đảm tương lai lâu dài
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="text-blue-600 text-4xl mb-4">
                <FaPhone />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Hỗ trợ kịp thời</h3>
              <p className="text-gray-600 leading-relaxed">
                Tư vấn – xử lý – cập nhật thông tin: tất cả đều kịp thời và chính xác
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Tất cả các khách hàng đều tin tưởng và đặt niềm tin
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Chúng tôi đặt khách hàng lên hàng đầu và cam kết tận tâm trong việc cung cấp dịch vụ. Chúng tôi tạo mối quan hệ chặt chẽ và xây dựng lòng tin bằng cách lắng nghe.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mt-8">
              <p className="text-xl italic leading-relaxed mb-4">
                "Mỗi hành trình đưa thuyền viên lên tàu 5 sao là một sứ mệnh mà chúng tôi gắn kết trọn vẹn tâm huyết và sự tận tâm. Chúng tôi không chỉ trao cho các bạn cơ hội hòa mình vào môi trường đẳng cấp quốc tế, mà còn kiến tạo một hành trình phát triển toàn diện, giúp các bạn trưởng thành với những giá trị bền vững."
              </p>
              <p className="font-bold text-lg">- PHÒNG DU HỌC VÀ VIỆC LÀM NGOÀI NƯỚC EASYTRIP</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Sẵn sàng khám phá cơ hội việc làm mới?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Liên hệ với chúng tôi ngay hôm nay để được tư vấn chi tiết
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:19001808" 
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-md font-semibold text-lg"
            >
              <FaPhone /> 1900 1808
            </a>
            <a 
              href="/vi/lien-he" 
              className="inline-flex items-center justify-center gap-2 bg-gray-700 text-white px-8 py-3 rounded-md font-semibold text-lg"
            >
              Liên hệ ngay
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WorkAbroad;
