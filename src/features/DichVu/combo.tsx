const ComboPage = () => (
    <main className="bg-white">
        <section className="bg-slate-100 py-12">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    Combo dịch vụ du lịch
                </h1>
                <p className="text-slate-600">
                    Giải pháp du lịch trọn gói – tiết kiệm chi phí – tiện lợi tối đa
                </p>
            </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 -mt-6">
            <div className="bg-white border border-slate-300 rounded-xl shadow-lg p-6 grid md:grid-cols-4 gap-4">
                <input
                    className="border border-slate-300 rounded-lg px-4 py-2"
                    placeholder="Điểm đến"
                />
                <input
                    type="date"
                    className="border border-slate-300 rounded-lg px-4 py-2"
                />
                <input
                    type="date"
                    className="border border-slate-300 rounded-lg px-4 py-2"
                />
                <button className="bg-blue-600 text-white rounded-lg font-semibold py-2">
                    Tìm combo
                </button>
            </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="bg-white border border-slate-300 rounded-xl shadow-md p-5 hover:shadow-lg transition"
                >
                    <div className="h-40 bg-slate-200 rounded-lg mb-4" />
                    <h3 className="font-semibold text-slate-900 mb-1">
                        Combo du lịch {i + 1}
                    </h3>
                    <p className="text-sm text-slate-600 mb-3">
                        Vé máy bay + khách sạn + dịch vụ
                    </p>
                    <div className="text-blue-600 font-bold">
                        Từ 6.990.000đ
                    </div>
                </div>
            ))}
        </section>
    </main>
);

export default ComboPage;
