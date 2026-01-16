import { FaSearch } from 'react-icons/fa';
import { veMayBayStyles } from './styles';

type Props = {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  onSearch: () => void;
};

export default function VeMayBaySearchForm({
  searchQuery,
  onSearchQueryChange,
  onSearch,
}: Props) {
  return (
    <div className={veMayBayStyles.search.wrap}>
      <div className={veMayBayStyles.search.panel}>
        <div className={veMayBayStyles.search.row}>
          <div className={veMayBayStyles.search.fieldWrap}>
            <FaSearch className={veMayBayStyles.search.icon} />
            <input
              type="text"
              placeholder="Tìm chuyến bay theo điểm đi, điểm đến, hãng bay..."
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              className={veMayBayStyles.search.input}
            />
          </div>
          <button type="button" onClick={onSearch} className={veMayBayStyles.search.submit}>
            <FaSearch />
            Tìm chuyến bay
          </button>
        </div>
      </div>
    </div>
  );
}
