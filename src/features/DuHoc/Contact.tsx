import React from 'react';
import { duHocStyles } from './styles';

const Contact: React.FC = () => {
    return (
        <section className={duHocStyles.contact.section}>
            <div className={duHocStyles.contact.container}>
                <div
                    className={duHocStyles.contact.panel}>
                    <div>
                        <h3 className={duHocStyles.contact.title}>Sẵn sàng bắt đầu hành trình du học?</h3>
                        <p className={duHocStyles.contact.desc}>Đăng ký tư vấn miễn phí hoặc gọi hotline để được hỗ trợ
                            ngay.</p>
                    </div>

                    <div className={duHocStyles.contact.actions}>
                        <a className={duHocStyles.contact.secondaryAction}>Gọi ngay: 1900
                            1000</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

