import { useState } from 'react';
import VeMayBayHero from './Hero';
import VeMayBaySearchForm from './SearchForm';
import VeMayBayResults from './Results';
import VeMayBayBenefits from './Benefits';
import { flightBenefits, flights } from './data';

const FlightTicketPage = () => {
	const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('round-trip');
	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');
	const [departDate, setDepartDate] = useState('');
	const [returnDate, setReturnDate] = useState('');
	const [passengers, setPassengers] = useState(1);

	return (
		<main className="bg-white min-h-screen">
			<VeMayBayHero tripType={tripType} onTripTypeChange={setTripType} />
			<VeMayBaySearchForm
				tripType={tripType}
				from={from}
				to={to}
				departDate={departDate}
				returnDate={returnDate}
				passengers={passengers}
				onFromChange={setFrom}
				onToChange={setTo}
				onDepartDateChange={setDepartDate}
				onReturnDateChange={setReturnDate}
				onPassengersChange={setPassengers}
			/>
			<VeMayBayResults flights={flights} />
			<VeMayBayBenefits items={flightBenefits} />
		</main>
	);
};

export default FlightTicketPage;
