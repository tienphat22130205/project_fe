import React from 'react';
import {Link} from 'react-router-dom';
import { FaUserFriends, FaFileAlt, FaGraduationCap } from 'react-icons/fa';

const FeatureCard: React.FC<{ title: string; desc: string; icon?: React.ReactNode }> = ({title, desc, icon}) => (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition transform hover:-translate-y-1">
        <div className="text-blue-600 text-2xl mb-3">{icon}</div>
        <h3 className="font-semibold text-lg text-slate-800">{title}</h3>
        <p className="mt-2 text-slate-600">{desc}</p>
    </div>
);

const StatCard: React.FC<{ num: string; label: string }> = ({num, label}) => (
    <div className="bg-white p-6 rounded-xl shadow text-center">
        <div className="text-3xl font-bold text-blue-600">{num}</div>
        <div className="mt-2 text-slate-600">{label}</div>
    </div>
);

const ProgramCard: React.FC<{ title: string; brief: string; href?: string; image?: string }> = ({title, brief, href = '#', image}) => (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition">
        {image && (
            <img src={image} alt={title} className="w-full h-40 object-cover rounded-md mb-4" />
        )}
        <h4 className="font-semibold text-lg text-slate-800">{title}</h4>
        <p className="mt-2 text-slate-600">{brief}</p>
        <div className="mt-4">
            <Link to={href} className="inline-block text-blue-600 font-semibold">Xem chi tiết →</Link>
        </div>
    </div>
);

// Gallery nhỏ sử dụng ảnh trong public/
const Gallery: React.FC<{ images: string[] }> = ({images}) => (
    <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {images.map((src, i) => (
            <div key={i} className="overflow-hidden rounded-lg bg-white shadow-sm">
                <img src={src} alt={`gallery-${i}`} className="w-full h-24 sm:h-32 object-cover transform hover:scale-105 transition" />
            </div>
        ))}
    </div>
);

const Cards: React.FC = () => {
    const galleryImages = ['/back9.jpg', '/back6.jpg', '/back7.jpg', '/back8.jpg'];

    return (
        <section id="programs" className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid md:grid-cols-3 gap-6">
                <FeatureCard title="Tư vấn 1:1" desc="Lộ trình cá nhân theo ngành, điểm mạnh và mục tiêu của bạn."
                             icon={<FaUserFriends className="text-2xl" aria-hidden="true"/>}/>
                <FeatureCard title="Hỗ trợ hồ sơ & visa"
                             desc="Chuẩn hoá hồ sơ, luyện phỏng vấn, nộp visa và theo dõi tiến trình."
                             icon={<FaFileAlt className="text-2xl" aria-hidden="true"/>}/>
                <FeatureCard title="Săn học bổng" desc="Tư vấn, tối ưu hồ sơ để ứng tuyển học bổng phù hợp."
                             icon={<FaGraduationCap className="text-2xl" aria-hidden="true"/>}/>
            </div>

            <div className="mt-10 grid sm:grid-cols-3 md:grid-cols-4 gap-6">
                <StatCard num="120+" label="Trường đối tác"/>
                <StatCard num="98%" label="Tỉ lệ thành công"/>
                <StatCard num="10" label="Năm kinh nghiệm"/>
                <StatCard num="5000+" label="Học sinh/khách hàng"/>
            </div>

            {/* gallery ảnh nhỏ */}
            <Gallery images={galleryImages} />

            <div className="mt-12">
                <h3 className="text-2xl font-semibold text-slate-800">Chương trình nổi bật</h3>
                <div className="mt-6 grid md:grid-cols-3 gap-6">
                    <ProgramCard title="Bậc đại học" brief="Chương trình cử nhân, hỗ trợ tìm học bổng và nộp hồ sơ."
                                 href="/du-hoc/dai-hoc" image="/back1.jpg" />
                    <ProgramCard title="Sau đại học" brief="Thạc sĩ/tiến sĩ: tư vấn trường, research, và tài chính."
                                 href="/du-hoc/sau-dai-hoc" image="/back2.jpg" />
                    <ProgramCard title="Ngắn hạn & Nghề" brief="Khóa ngắn hạn, tiếng Anh, nghề nghiệp chuyên môn."
                                 href="/du-hoc/ngan-han" image="/back4.jpg" />
                </div>
            </div>
        </section>
    );
};

export default Cards;

