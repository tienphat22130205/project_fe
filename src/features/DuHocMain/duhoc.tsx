const MainContent = () => (
    <main className="bg-white">

        <section className="bg-slate-50 py-20">
            <div className="max-w-7xl mx-auto px-6 flex justify-center">
                <div className="bg-white border border-blue-300 rounded-2xl shadow-md p-12 w-full md:w-10/12">
                    <h2 className="text-3xl font-bold text-blue-700 text-center mb-8">
                        Cam kết của chúng tôi
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4 text-slate-700 text-base">
                        <p>✔ Bảo chứng bởi thương hiệu hơn 50 năm.</p>
                        <p>✔ Đồng hành xuyên suốt quá trình du học.</p>
                        <p>✔ Lộ trình học tập cá nhân hóa.</p>
                        <p>✔ Tư vấn 1:1 trực tiếp & trực tuyến.</p>
                        <p>✔ Mạng lưới hơn 120 trường quốc tế.</p>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-20">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
                    Dịch vụ du học trọn gói
                </h2>
                <div className="grid md:grid-cols-4 gap-8">
                    {[
                        "Tư vấn chọn trường & săn học bổng",
                        "Hỗ trợ hồ sơ nhập học & ký túc xá",
                        "Visa du học & thăm thân",
                        "Ngân hàng, bảo hiểm & vé máy bay"
                    ].map((s) => (
                        <div
                            key={s}
                            className="bg-white border border-slate-300 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition"
                        >
                            <p className="font-semibold text-slate-700">{s}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className="bg-slate-50 py-24">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-blue-700">
                    Thành công được <br />
                    chứng minh qua <br />
                    những con số
                </h1>
                <p className="text-slate-700 leading-relaxed text-lg">
                    Với đội ngũ tư vấn viên giàu kinh nghiệm và am hiểu sâu sắc thị trường du học quốc tế,
                    chúng tôi đồng hành cùng học sinh từ lựa chọn chương trình học, chuẩn bị hồ sơ,
                    xin visa đến ổn định cuộc sống tại nước ngoài.
                </p>
            </div>
        </section>

        <section className="py-20">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-center">
                {[
                    { label: "Trường đối tác", value: "120+" },
                    { label: "Học sinh tư vấn", value: "2400+" },
                    { label: "Năm kinh nghiệm", value: "10+" },
                    { label: "Tỷ lệ thành công", value: "98%" }
                ].map((item) => (
                    <div
                        key={item.label}
                        className="bg-white border border-slate-300 rounded-xl p-8 shadow-md"
                    >
                        <div className="text-4xl font-bold text-blue-600 mb-2">
                            {item.value}
                        </div>
                        <div className="text-slate-600">
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>
        </section>

        <section className="bg-slate-50 py-20">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
                    Chương trình du học
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {["Du học Đại học", "Sau Đại học", "Du học nghề"].map((p) => (
                        <div
                            key={p}
                            className="bg-white border border-slate-300 rounded-xl p-8 text-center font-semibold text-slate-700 shadow-md hover:shadow-lg transition"
                        >
                            {p}
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className="py-20">
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white border border-blue-300 rounded-2xl p-12 text-center shadow-md">
                    <h2 className="text-3xl font-bold mb-4 text-blue-700">
                        Học bổng quốc tế
                    </h2>
                    <p className="text-lg text-slate-700">
                        Hỗ trợ săn học bổng lên đến <span className="font-bold">100%</span>
                    </p>
                </div>
            </div>
        </section>

        <section className="bg-slate-50 py-24">
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white border border-slate-300 rounded-2xl p-12 text-center shadow-md">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">
                        Tư vấn du học miễn phí
                    </h2>
                    <p className="text-lg text-slate-600">
                        Hotline: <span className="font-semibold">1900 1808</span>
                    </p>
                </div>
            </div>
        </section>

        <section className="py-20">
            <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">
                Cảm nhận học sinh
            </h2>
            <blockquote className="max-w-3xl mx-auto text-center italic text-slate-600 text-lg">
                “Quy trình rõ ràng, tư vấn tận tâm và hỗ trợ rất nhanh.
                Gia đình mình hoàn toàn yên tâm khi lựa chọn trung tâm.”
            </blockquote>
        </section>

    </main>
);

export default MainContent;
