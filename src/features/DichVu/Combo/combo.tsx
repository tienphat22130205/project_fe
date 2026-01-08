import ComboHero from './Hero';
import ComboList from './ComboList';
import WhyChooseCombo from './WhyChoose';
import { comboCategories, comboItems, comboWhyChooseItems } from './data';

export default function ComboPage() {
	return (
		<main className="bg-white min-h-screen">
			<ComboHero categories={comboCategories} />
			<ComboList combos={comboItems} />
			<WhyChooseCombo items={comboWhyChooseItems} />
		</main>
	);
}
