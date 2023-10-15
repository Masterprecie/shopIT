
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';

const ProductDetails = () => {
	const { id } = useParams(); // Get the product ID from the URL

	const [product, setProduct] = useState(null);

	useEffect(() => {
		axios
			.get(`/products/${id}`)
			.then((response) => {
				setProduct(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [id]);

	if (!product) {
		return <p>Loading...</p>;
	}

	const { image, price, rating, title, description, category } = product;

	return (
		<div className="flex flex-col items-center p-8">
			<img src={image} alt={title} className="max-w-full max-h-96 border rounded-lg mb-4" />
			<h2 className="text-3xl font-semibold mb-2">{title}</h2>
			<p className="text-xl font-semibold text-blue-600 mb-2">{description}</p>
			<p>{category}</p>
			<p>Price: ${price}</p>
			<p className="text-lg text-blue-500">Rating: {rating.rate}</p>
		</div>
	);
};

export default ProductDetails;
