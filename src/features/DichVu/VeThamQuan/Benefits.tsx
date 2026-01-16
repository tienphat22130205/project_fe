import type { BenefitItem } from './data';
import { veThamQuanStyles } from './styles';

type Props = {
  items: BenefitItem[];
};

export default function OnlineBenefits({ items }: Props) {
  return (
    <section className={veThamQuanStyles.benefits.section}>
      <div className={veThamQuanStyles.container}>
        <h2 className={veThamQuanStyles.benefits.title}>Lợi ích khi đặt vé online</h2>
        <div className={veThamQuanStyles.benefits.grid}>
          {items.map((item, i) => {
            const IconComponent = item.icon;
            return (
              <div key={i} className={veThamQuanStyles.benefits.card}>
                <div className={veThamQuanStyles.benefits.iconWrap}>
                  <IconComponent className={veThamQuanStyles.benefits.icon} />
                </div>
                <h3 className={veThamQuanStyles.benefits.itemTitle}>{item.title}</h3>
                <p className={veThamQuanStyles.benefits.itemDesc}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
