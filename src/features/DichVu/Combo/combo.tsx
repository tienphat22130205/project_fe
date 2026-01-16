import { useMemo, useState } from 'react';
import ComboHero from './Hero';
import ComboList from './ComboList';
import ComboFeatures from './Features';
import { comboCategories, comboItems, comboWhyChooseItems } from './data';
import { comboStyles } from './styles';

export default function ComboPage() {
	const [searchQuery, setSearchQuery] = useState('');

	const filteredCombos = useMemo(() => {
		const q = searchQuery.trim().toLowerCase();
		if (!q) return comboItems;
		return comboItems.filter((combo) => {
			const haystack = `${combo.title} ${combo.location}`.toLowerCase();
			return haystack.includes(q);
		});
	}, [searchQuery]);

	const handleSearch = () => {
		setSearchQuery((v) => v.trim());
	};

	return (
		<main className={comboStyles.page.root}>
			<ComboHero
				categories={comboCategories}
				searchQuery={searchQuery}
				onSearchQueryChange={setSearchQuery}
				onSearch={handleSearch}
			/>
			<ComboList combos={filteredCombos} />
			<ComboFeatures items={comboWhyChooseItems} />
		</main>
	);
}
