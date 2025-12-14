const Destinations = () => (
    <section id="destinations" className="bg-slate-50 p-10">
        <h2 className="text-2xl font-bold text-center mb-6">Quốc gia du học</h2>
        <div className="flex justify-center gap-6">
            {["Mỹ", "Úc", "Canada", "Nhật Bản"].map(c => (
                <div key={c} className="bg-white px-6 py-4 rounded shadow">{c}</div>
            ))}
        </div>
    </section>
);
export default Destinations;