import React from 'react';

const CTA: React.FC = () => {
    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-bold">Sẵn sàng bắt đầu hành trình du học?</h3>
                        <p className="mt-2 text-slate-100">Đăng ký tư vấn miễn phí hoặc gọi hotline để được hỗ trợ
                            ngay.</p>
                    </div>

                    <div className="mt-4 md:mt-0 flex gap-3">
                        <a href="#contact" className="bg-white text-blue-600 px-5 py-3 rounded-lg font-semibold">Đăng ký
                            tư vấn</a>
                        <a className="border border-white px-4 py-3 rounded-lg">Gọi ngay: 1900
                            1000</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;

