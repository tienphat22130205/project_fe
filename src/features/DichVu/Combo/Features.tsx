import type { WhyChooseItem } from './data';
import { comboStyles } from './styles';

type Props = {
  items: WhyChooseItem[];
};

export default function ComboFeatures({ items }: Props) {
  return (
    <section className={comboStyles.features.section}>
      <div className={comboStyles.container}>
        <h2 className={comboStyles.features.title}>Vì sao nên chọn combo du lịch?</h2>
        <div className={comboStyles.features.grid}>
          {items.map((item, i) => {
            const IconComponent = item.icon;
            return (
              <div key={i} className={comboStyles.features.item}>
                <div className={comboStyles.features.iconWrap}>
                  <IconComponent className={comboStyles.features.icon} />
                </div>
                <h3 className={comboStyles.features.itemTitle}>{item.title}</h3>
                <p className={comboStyles.features.itemDesc}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
