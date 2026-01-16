import React from 'react';
import {Link} from 'react-router-dom';
import {FaBook, FaGraduationCap, FaGlobe} from 'react-icons/fa';
import { duHocStyles } from './styles';

const Hero: React.FC = () => {
    return (
        <section className={duHocStyles.hero.section}>
            <div className={duHocStyles.hero.container}>
                <div className={duHocStyles.hero.panel}>

                    <div
                        className={duHocStyles.hero.backdrop}
                        style={{
                            backgroundImage: "url('/back5.jpg')",
                        }}
                        aria-hidden="true"
                    />

                    <div className={duHocStyles.hero.content}>
                        <div className="max-w-3xl">
                            <h1 className={duHocStyles.hero.title}>
                                Du học — Mở ra cơ hội toàn cầu
                            </h1>

                            <p className={duHocStyles.hero.subtitle}>
                                Tư vấn 1:1, hỗ trợ hồ sơ & visa, săn học bổng phù hợp với năng lực của bạn.
                            </p>

                            <div className={duHocStyles.hero.actions}>
                                <Link
                                    to="#contact"
                                    className={duHocStyles.hero.actionButton}
                                >
                                    Đăng ký tư vấn
                                </Link>

                                <a
                                    href="#programs"
                                    className={duHocStyles.hero.actionButton}
                                >
                                    Xem chương trình
                                </a>
                            </div>

                            <div className={duHocStyles.hero.meta}>
                                <div className={duHocStyles.hero.metaItem}>
                                    <FaBook className={duHocStyles.hero.metaIcon} aria-hidden="true"/>
                                    <span>120+ trường đối tác</span>
                                </div>
                                <div className={duHocStyles.hero.metaItem}>
                                    <FaGraduationCap className={duHocStyles.hero.metaIcon} aria-hidden="true"/>
                                    <span>10 năm tư vấn</span>
                                </div>
                                <div className={duHocStyles.hero.metaItem}>
                                    <FaGlobe className={duHocStyles.hero.metaIcon} aria-hidden="true"/>
                                    <span>Hỗ trợ toàn cầu</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
