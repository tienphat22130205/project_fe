import { FaFilter } from 'react-icons/fa';
import type { Category } from './data';

type Props = {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
};

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-8 mt-12">
      <div className="flex items-center gap-2 mb-4">
        <FaFilter className="text-gray-600" />
        <span className="font-semibold text-gray-900">Lọc theo danh mục:</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-400'
              }`}
            >
              <IconComponent />
              {cat.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}
