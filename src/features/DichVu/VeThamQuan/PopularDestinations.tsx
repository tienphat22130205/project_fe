import { FaTicketAlt } from 'react-icons/fa';
import { veThamQuanStyles } from './styles';

type Props = {
  locations: string[];
};

export default function PopularDestinations({ locations }: Props) {
  return (
    <section className={veThamQuanStyles.popular.section}>
      <div className={veThamQuanStyles.container}>
        <h2 className={veThamQuanStyles.popular.title}>Các địa điểm nổi bật</h2>
        <div className={veThamQuanStyles.popular.grid}>
          {locations.map((location, i) => (
            <div
              key={i}
              className={veThamQuanStyles.popular.card}
            >
              <div className={veThamQuanStyles.popular.iconWrap}>
                <FaTicketAlt className="text-3xl" />
              </div>
              <div className={veThamQuanStyles.popular.name}>{location}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
