const AttractionTicketPage = () => (
  <main className="bg-white">

    <section className="bg-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Vé tham quan – vui chơi
        </h1>
        <p className="text-slate-600">
          Đặt vé nhanh – không xếp hàng – giá ưu đãi
        </p>
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-6 -mt-6">
      <div className="bg-white border border-slate-300 rounded-xl shadow-lg p-6 flex gap-4">
        <input
          className="border border-slate-300 rounded-lg px-4 py-2 flex-1"
          placeholder="Tìm địa điểm tham quan"
        />
        <button className="bg-blue-600 text-white rounded-lg font-semibold px-6">
          Tìm vé
        </button>
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="bg-white border border-slate-300 rounded-xl shadow-md p-4 hover:shadow-lg transition"
        >
          <div className="h-32 bg-slate-200 rounded-lg mb-3" />
          <h3 className="font-semibold text-slate-900 text-sm mb-1">
            Vé tham quan {i + 1}
          </h3>
          <div className="text-blue-600 font-bold text-sm">
            Từ 150.000đ
          </div>
        </div>
      ))}
    </section>

  </main>
);

export default AttractionTicketPage;
