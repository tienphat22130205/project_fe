import React from 'react';
import Hero from './Hero';
import Cards from './Cards';
import Contact from './Contact';
import { duHocStyles } from './styles';

const DuHoc: React.FC = () => {
    return (
        <main className={duHocStyles.page.root}>
            <Hero/>
            <Cards/>
            <Contact/>
            <section className={duHocStyles.page.footer}>
                <p>© {new Date().getFullYear()} EasyTrip - Dịch vụ tư vấn du học. Mọi thông tin chỉ mang tính chất tham
                    khảo.</p>
            </section>
        </main>
    );
};

export default DuHoc;
