import { BsCart4 } from 'react-icons/bs';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useCartContext } from '../../context/UseCartContext';

const AllProduct = () => {
	const navigate = useNavigate();
	const { cartState, addToCart, removeFromCart } = useCartContext();
	const { user } = useAuthContext();
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		axios
			.get('/products')
			.then((response) => {
				console.log(response);
				setProducts(response.data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setIsLoading(false);
			});
	}, []);

	const isItemInCart = (productId) => {
		return cartState.cart.some((item) => item.id === productId);
	};

	const AddToCart = (product) => {
		if (user) {
			if (isItemInCart(product.id)) {
				// If the item is in the cart, display a "Remove from Cart" button
				removeFromCart(product);
			} else {
				// If the item is not in the cart, display an "Add to Cart" button
				addToCart(product);
			}
		} else {
			alert('Please Login First');
			navigate('/login');
		}
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<div className="lg:grid grid-cols-4 gap-5  gap-y-10 lg:px-16 px-5 py-14 pt-32 z-0 relative">
			{products.map((product) => {
				const { id, image, price, rating, title } = product;
				return (
					<div key={id} className=" p-2 border mb-5 lg:mb-0 shadow-lg rounded-md pb-10">
						<div className="mb-3">
							<img src={image} alt="" className="w-full object-scale-down h-40" />
						</div>
						<div>
							<p className="text-sm font-bold">{title}</p>
							<p className="font-bold">
								Price: <span className="font-semibold">${price}</span>
							</p>
							<p className="font-bold">
								Rating: <span>{rating.rate}</span>
							</p>
							<div className="flex mt-2">
								{Array.from({ length: Math.round(rating.rate) }, (_, index) => (
									<AiFillStar key={index} />
								))}
								{Array.from({ length: 5 - Math.round(rating.rate) }, (_, index) => (
									<AiOutlineStar key={index} />
								))}
							</div>

							<div className="flex items-center text-end gap-3 justify-between  py-2  mt-4  w-[100%] rounded-lg">
								<div className='flex gap-4 border p-2 rounded-md shadow-md '>
									<BsCart4 size={20} className="text-red-500" />
									<button type="submit" onClick={() => AddToCart(product)} className='text-sm font-semibold'>
										{isItemInCart(product.id) ? 'Remove from Cart' : 'Add to Cart'}
									</button>
								</div>

								<div className='text-sm font-semibold ' >
									<Link to={`/product/${id}`}>
										<button className='underline'> See Details</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default AllProduct;