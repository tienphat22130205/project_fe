import type { BenefitItem } from './data';
import { veMayBayStyles } from './styles';

type Props = {
  items: BenefitItem[];
};

export default function VeMayBayBenefits({ items }: Props) {
  return (
    <section className={veMayBayStyles.benefits.section}>
      <div className={veMayBayStyles.container}>
        <h2 className={veMayBayStyles.benefits.title}>Ưu điểm khi đặt vé qua chúng tôi</h2>
        <div className={veMayBayStyles.benefits.grid}>
          {items.map((item, i) => {
            const IconComponent = item.icon;
            return (
              <div key={i} className={veMayBayStyles.benefits.card}>
                <div className={veMayBayStyles.benefits.iconWrap}>
                  <IconComponent className={veMayBayStyles.benefits.icon} />
                </div>
                <h3 className={veMayBayStyles.benefits.itemTitle}>{item.title}</h3>
                <p className={veMayBayStyles.benefits.itemDesc}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
