const FlightTicketPage = () => (
    <main className="bg-white">

        <section className="bg-blue-50 py-12">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    Vé máy bay
                </h1>
                <p className="text-slate-600">
                    Đặt vé nhanh chóng – giá tốt – hỗ trợ 24/7
                </p>
            </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 -mt-6">
            <div className="bg-white border border-slate-300 rounded-xl shadow-lg p-6 grid md:grid-cols-5 gap-4">
                <input className="border border-slate-300 rounded-lg px-4 py-2" placeholder="Điểm đi" />
                <input className="border border-slate-300 rounded-lg px-4 py-2" placeholder="Điểm đến" />
                <input type="date" className="border border-slate-300 rounded-lg px-4 py-2" />
                <input type="date" className="border border-slate-300 rounded-lg px-4 py-2" />
                <button className="bg-blue-600 text-white rounded-lg font-semibold">
                    Tìm chuyến bay
                </button>
            </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-14 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className="bg-white border border-slate-300 rounded-xl shadow-sm p-5 flex justify-between items-center"
                >
                    <div>
                        <div className="font-semibold text-slate-900">TP.HCM → Hà Nội</div>
                        <div className="text-sm text-slate-600">Vietnam Airlines</div>
                    </div>
                    <div className="font-bold text-blue-600">2.350.000đ</div>
                </div>
            ))}
        </section>

    </main>
);

export default FlightTicketPage;
