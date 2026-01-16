import { FaFilter } from 'react-icons/fa';
import type { Category } from './data';
import { veThamQuanStyles } from './styles';

type Props = {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
};

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }: Props) {
  return (
    <section className={veThamQuanStyles.categoryFilter.section}>
      <div className={veThamQuanStyles.categoryFilter.header}>
        <FaFilter className="text-gray-600" />
        <span className={veThamQuanStyles.categoryFilter.title}>Lọc theo danh mục:</span>
      </div>
      <div className={veThamQuanStyles.categoryFilter.chips}>
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`${veThamQuanStyles.categoryFilter.chipBase} ${
                selectedCategory === cat.id
                  ? veThamQuanStyles.categoryFilter.chipActive
                  : veThamQuanStyles.categoryFilter.chipInactive
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
