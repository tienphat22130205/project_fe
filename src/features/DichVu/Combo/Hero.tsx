import { FaSearch } from 'react-icons/fa';
import type { ComboCategory } from './data';
import { comboStyles } from './styles';

type Props = {
  categories: ComboCategory[];
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  onSearch: () => void;
};

export default function ComboHero({ categories, searchQuery, onSearchQueryChange, onSearch }: Props) {
  return (
    <section className={comboStyles.hero.section}>
      <div className={comboStyles.container}>
        <div className={comboStyles.hero.headingWrap}>
          <h1 className={comboStyles.hero.title}>Combo du lịch</h1>
          <p className={comboStyles.hero.subtitle}>
            Giải pháp hoàn hảo giúp bạn tiết kiệm chi phí, thuận tiện và tận hưởng trọn vẹn chuyến đi
          </p>
        </div>

        <div className={comboStyles.hero.categoriesGrid}>
          {categories.map((cat, i) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={i}
                className={comboStyles.hero.categoryItem}
              >
                <div className={comboStyles.hero.categoryIconWrap}>
                  <IconComponent className="text-3xl" />
                </div>
                <div className={comboStyles.hero.categoryName}>{cat.name}</div>
              </div>
            );
          })}
        </div>

        <div className={comboStyles.hero.searchPanel}>
          <div className={comboStyles.hero.searchRow}>
            <div className={comboStyles.hero.fieldWrap}>
              <FaSearch className={comboStyles.hero.fieldIcon} />
              <input
                type="text"
                placeholder="Tìm combo theo địa điểm, tên combo..."
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                className={comboStyles.hero.input}
              />
            </div>
            <button type="button" onClick={onSearch} className={comboStyles.hero.button}>
              <FaSearch />
              Tìm combo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
