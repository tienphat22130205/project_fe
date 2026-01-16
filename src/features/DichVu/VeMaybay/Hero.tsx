import { veMayBayStyles } from './styles';

type TripType = 'one-way' | 'round-trip';

type Props = {
  tripType: TripType;
  onTripTypeChange: (value: TripType) => void;
  children?: React.ReactNode;
};

export default function VeMayBayHero({ tripType, onTripTypeChange, children }: Props) {
  return (
    <section className={veMayBayStyles.hero.section}>
      <div className={veMayBayStyles.container}>
        <div className={veMayBayStyles.hero.headingWrap}>
          <h1 className={veMayBayStyles.hero.title}>Vé Máy Bay Online</h1>
          <p className={veMayBayStyles.hero.subtitle}>Đặt Online - Bay Giá Tốt - Dịch Vụ Chuẩn</p>
        </div>

        <div className={veMayBayStyles.hero.tabs}>
          <button
            onClick={() => onTripTypeChange('one-way')}
            className={`${veMayBayStyles.hero.tabBase} ${
              tripType === 'one-way' ? veMayBayStyles.hero.tabActive : veMayBayStyles.hero.tabInactive
            }`}
          >
            Một chiều
          </button>
          <button
            onClick={() => onTripTypeChange('round-trip')}
            className={`${veMayBayStyles.hero.tabBase} ${
              tripType === 'round-trip' ? veMayBayStyles.hero.tabActive : veMayBayStyles.hero.tabInactive
            }`}
          >
            Khứ hồi
          </button>
        </div>

        {children}
      </div>
    </section>
  );
}
