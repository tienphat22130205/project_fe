import React from 'react';
import {Link} from 'react-router-dom';
import { FaUserFriends, FaFileAlt, FaGraduationCap } from 'react-icons/fa';
import { duHocStyles } from './styles';

const FeatureCard: React.FC<{ title: string; desc: string; icon?: React.ReactNode }> = ({title, desc, icon}) => (
    <div className={`${duHocStyles.cards.featureCard.base} ${duHocStyles.cards.featureCard.hover}`}>
        <div className={duHocStyles.cards.featureCard.icon}>{icon}</div>
        <h3 className={duHocStyles.cards.featureCard.title}>{title}</h3>
        <p className={duHocStyles.cards.featureCard.desc}>{desc}</p>
    </div>
);

const StatCard: React.FC<{ num: string; label: string }> = ({num, label}) => (
    <div className={duHocStyles.cards.statCard.base}>
        <div className={duHocStyles.cards.statCard.num}>{num}</div>
        <div className={duHocStyles.cards.statCard.label}>{label}</div>
    </div>
);

const ProgramCard: React.FC<{ title: string; brief: string; href?: string; image?: string }> = ({title, brief, href = '#', image}) => (
    <div className={`${duHocStyles.cards.programCard.base} ${duHocStyles.cards.programCard.hover}`}>
        {image && (
            <img src={image} alt={title} className={duHocStyles.cards.programCard.image} />
        )}
        <h4 className={duHocStyles.cards.programCard.title}>{title}</h4>
        <p className={duHocStyles.cards.programCard.desc}>{brief}</p>
        <div className="mt-4">
            <Link to={href} className={duHocStyles.cards.programCard.link}>Xem chi tiết →</Link>
        </div>
    </div>
);

const Gallery: React.FC<{ images: string[] }> = ({images}) => (
    <div className={duHocStyles.cards.galleryGrid}>
        {images.map((src, i) => (
            <div key={i} className={duHocStyles.cards.galleryItem.wrap}>
                <img src={src} alt={`gallery-${i}`} className={duHocStyles.cards.galleryItem.image} />
            </div>
        ))}
    </div>
);

const Cards: React.FC = () => {
    const galleryImages = ['/back9.jpg', '/back6.jpg', '/back7.jpg', '/back8.jpg'];

    return (
        <section id="programs" className={duHocStyles.cards.section}>
            <div className={duHocStyles.cards.grid3}>
                <FeatureCard
                    title="Tư vấn 1:1"
                    desc="Lộ trình cá nhân theo ngành, điểm mạnh và mục tiêu của bạn."
                    icon={<FaUserFriends className="text-2xl" aria-hidden="true"/>}
                />
                <FeatureCard title="Hỗ trợ hồ sơ & visa"
                             desc="Chuẩn hoá hồ sơ, luyện phỏng vấn, nộp visa và theo dõi tiến trình."
                             icon={<FaFileAlt className="text-2xl" aria-hidden="true"/>}/>
                <FeatureCard title="Săn học bổng" desc="Tư vấn, tối ưu hồ sơ để ứng tuyển học bổng phù hợp."
                             icon={<FaGraduationCap className="text-2xl" aria-hidden="true"/>}/>
            </div>

            <div className={duHocStyles.cards.statsGrid}>
                <StatCard num="120+" label="Trường đối tác"/>
                <StatCard num="98%" label="Tỉ lệ thành công"/>
                <StatCard num="10" label="Năm kinh nghiệm"/>
                <StatCard num="5000+" label="Học sinh/khách hàng"/>
            </div>
            <Gallery images={galleryImages} />

            <div className="mt-12">
                <h3 className={duHocStyles.cards.featuredTitle}>Chương trình nổi bật</h3>
                <div className={duHocStyles.cards.featuredGrid}>
                    <ProgramCard title="Bậc đại học" brief="Chương trình cử nhân, hỗ trợ tìm học bổng và nộp hồ sơ."
                                 href="/du-hoc/dai-hoc" image="/back5.jpg" />
                    <ProgramCard title="Sau đại học" brief="Thạc sĩ/tiến sĩ: tư vấn trường, research, và tài chính."
                                 href="/du-hoc/sau-dai-hoc" image="/back6.jpg" />
                    <ProgramCard title="Ngắn hạn & Nghề" brief="Khóa ngắn hạn, tiếng Anh, nghề nghiệp chuyên môn."
                                 href="/du-hoc/ngan-han" image="/back7.jpg" />
                </div>
            </div>
        </section>
    );
};

export default Cards;

