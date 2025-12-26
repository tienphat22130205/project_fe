import React from 'react';
import {Link} from 'react-router-dom';
import {FaBook, FaGraduationCap, FaGlobe} from 'react-icons/fa';

const Hero: React.FC = () => {
    return (
        <section className="bg-white">
            <div className="max-w-7xl mx-auto px-6 py-16 md:py-28">
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">

                    <div
                        className="absolute inset-0 bg-cover bg-center brightness-[0.65]"
                        style={{
                            backgroundImage: "url('/back5.jpg')",
                        }}
                        aria-hidden="true"
                    />

                    <div className="relative p-8 md:p-16">
                        <div className="max-w-3xl">
                            <h1 className="text-3xl md:text-5xl text-white font-extrabold leading-tight drop-shadow-lg [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)]">
                                Du học — Mở ra cơ hội toàn cầu
                            </h1>

                            <p className="mt-4 text-lg md:text-xl text-white">
                                Tư vấn 1:1, hỗ trợ hồ sơ & visa, săn học bổng phù hợp với năng lực của bạn.
                            </p>

                            <div className="mt-8 flex flex-col sm:flex-row gap-3">
                                <Link
                                    to="#contact"
                                    className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                                >
                                    Đăng ký tư vấn
                                </Link>

                                <a
                                    href="#programs"
                                    className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                                >
                                    Xem chương trình
                                </a>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-200">
                                <div className="flex items-center gap-2">
                                    <FaBook className="text-xl text-white" aria-hidden="true"/>
                                    <span>120+ trường đối tác</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaGraduationCap className="text-xl text-white" aria-hidden="true"/>
                                    <span>10 năm tư vấn</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaGlobe className="text-xl text-white" aria-hidden="true"/>
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
