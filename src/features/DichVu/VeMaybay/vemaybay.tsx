import { useMemo, useState } from 'react';
import VeMayBayHero from './Hero';
import VeMayBaySearchForm from './SearchForm';
import VeMayBayResults from './Results';
import VeMayBayBenefits from './Benefits';
import { flightBenefits, flights } from './data';
import { veMayBayStyles } from './styles';

const FlightTicketPage = () => {
	const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('round-trip');
	const [searchQuery, setSearchQuery] = useState('');

	const filteredFlights = useMemo(() => {
		const q = searchQuery.trim().toLowerCase();
		if (!q) return flights;
		return flights.filter((flight) => {
			const haystack = `${flight.from} ${flight.to} ${flight.airline} ${flight.flightNo}`.toLowerCase();
			return haystack.includes(q);
		});
	}, [searchQuery]);

	const handleSearch = () => {
		setSearchQuery((v) => v.trim());
	};

	return (
		<main className={veMayBayStyles.page.root}>
			<VeMayBayHero tripType={tripType} onTripTypeChange={setTripType}>
				<VeMayBaySearchForm
					searchQuery={searchQuery}
					onSearchQueryChange={setSearchQuery}
					onSearch={handleSearch}
				/>
			</VeMayBayHero>
			<VeMayBayResults flights={filteredFlights} />
			<VeMayBayBenefits items={flightBenefits} />
		</main>
	);
};

export default FlightTicketPage;
