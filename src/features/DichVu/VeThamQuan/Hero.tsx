import { FaSearch } from 'react-icons/fa';
import { veThamQuanStyles } from './styles';

type Props = {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
};

export default function VeThamQuanHero({ searchQuery, onSearchQueryChange }: Props) {
  return (
    <section className={veThamQuanStyles.hero.section}>
      <div className={veThamQuanStyles.container}>
        <div className={veThamQuanStyles.hero.headingWrap}>
          <h1 className={veThamQuanStyles.hero.title}>Vé Tham Quan Sun World</h1>
          <p className={veThamQuanStyles.hero.subtitle}>Đặt Vé Online - Trải Nghiệm Ngay - Không Xếp Hàng</p>
        </div>

        <div className={veThamQuanStyles.hero.searchPanel}>
          <div className={veThamQuanStyles.hero.searchRow}>
            <div className={veThamQuanStyles.hero.fieldWrap}>
              <FaSearch className={veThamQuanStyles.hero.icon} />
              <input
                type="text"
                placeholder="Tìm địa điểm tham quan, công viên giải trí..."
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                className={veThamQuanStyles.hero.input}
              />
            </div>
            <button className={veThamQuanStyles.hero.button}>
              <FaSearch />
              Tìm vé
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
