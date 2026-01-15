import type { WhyChooseItem } from './data';

type Props = {
  items: WhyChooseItem[];
};

export default function ComboFeatures({ items }: Props) {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Vì sao nên chọn combo du lịch?</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {items.map((item, i) => {
            const IconComponent = item.icon;
            return (
              <div key={i} className="text-center p-6 rounded-xl bg-white">
                <div className="flex justify-center mb-4">
                  <IconComponent className="text-4xl text-blue-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
