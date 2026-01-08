import { FaTicketAlt } from 'react-icons/fa';

type Props = {
  locations: string[];
};

export default function PopularDestinations({ locations }: Props) {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Các địa điểm nổi bật</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {locations.map((location, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-center text-white cursor-pointer shadow-lg"
            >
              <div className="flex justify-center mb-2">
                <FaTicketAlt className="text-3xl" />
              </div>
              <div className="font-bold text-lg">{location}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
