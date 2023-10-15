import { useState } from "react";
import NavBar from "../../components/NavBar"
import AllProduct from "../Product/AllProduct"

const Home = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const handleSearch = (query) => {
		setSearchQuery(query);
	};
	return (
		<div>
			<NavBar onSearch={handleSearch} />
			<AllProduct searchQuery={searchQuery} />

		</div>
	)
}

export default Home