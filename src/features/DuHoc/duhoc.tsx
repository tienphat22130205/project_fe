import React from 'react';
import Hero from './Hero';
import Cards from './Cards';
import CTA from './CTA';

const DuHoc: React.FC = () => {
    return (
        <main className="bg-slate-50 min-h-screen">
            <Hero/>
            <Cards/>
            <CTA/>
            <section className="max-w-7xl mx-auto px-6 py-12 text-center text-slate-600">
                <p>© {new Date().getFullYear()} EasyTrip - Dịch vụ tư vấn du học. Mọi thông tin chỉ mang tính chất tham
                    khảo.</p>
            </section>
        </main>
    );
};

export default DuHoc;
