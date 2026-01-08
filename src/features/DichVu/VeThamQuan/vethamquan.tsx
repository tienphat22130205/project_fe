import { useState } from 'react';
import VeThamQuanHero from './Hero';
import CategoryFilter from './CategoryFilter';
import TicketsGrid from './TicketsGrid';
import PopularDestinations from './PopularDestinations';
import OnlineBenefits from './Benefits';
import { categories, onlineBenefits, popularLocations, tickets } from './data';

const AttractionTicketPage = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');

	const filteredTickets = tickets.filter((ticket) => {
		const matchesSearch =
			ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			ticket.location.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory = selectedCategory === 'all' || ticket.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	return (
		<main className="bg-white min-h-screen">
			<VeThamQuanHero searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />
			<CategoryFilter
				categories={categories}
				selectedCategory={selectedCategory}
				onSelectCategory={setSelectedCategory}
			/>
			<TicketsGrid tickets={filteredTickets} />
			<PopularDestinations locations={popularLocations} />
			<OnlineBenefits items={onlineBenefits} />
		</main>
	);
};

export default AttractionTicketPage;
