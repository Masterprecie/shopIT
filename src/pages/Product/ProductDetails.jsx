import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useCartContext } from '../../context/UseCartContext';
import NavBar from '../../components/NavBar';
import { useAuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';


const ProductDetails = () => {
	const { id } = useParams(); // Get the product ID from the URL
	const navigate = useNavigate()
	const { user } = useAuthContext();
	const { cartState, addToCart, removeFromCart } = useCartContext();
	const [product, setProduct] = useState(null);
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
				toast.success('Item added to cart!', {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
		} else {
			alert('Please Login First');
			navigate('/login');
		}
	};
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
		return <div> <LoadingSpinner /> </div>
	}


	const { image, price, rating, title, description, category } = product;

	return (
		<>
			<NavBar />
			<div className="mx-auto px-4 pt-32 pb-16  lg:h-[100vh] h-auto">
				<div className='mb-3 border shadow-md lg:w-[5%] w-[20%] text-center p-2 rounded-md'>
					<Link to="/" className=" font-semibold ">
						Back
					</Link>
				</div>

				<div className="lg:flex justify-between gap-8 items-center border p-3 shadow-lg rounded-md">

					<div >
						<img src={image} alt={title} className="w-full rounded-lg mb-4" />
					</div>
					<div>
						<h2 className="text-2xl font-bold mb-2">Product Name : <span className='md:text-xl text-lg font-normal'>{title}</span> </h2>
						<p className="text-2xl font-bold mb-2">Category: <span className='md:text-xl text-lg capitalize font-normal' > {category}</span> </p>
						<p className="text-2xl font-bold mb-2">Product Description: <span className='md:text-xl text-lg  font-normal'>{description}</span></p>
						<p className="text-2xl font-bold mb-2">Price: <span className='md:text-xl text-lg font-normal '>${price}</span> </p>
						<p className="text-2xl font-bold mb-4">Rating: <span className='text-xl font-normal'>{rating.rate}</span> </p>

						<button type="submit" onClick={() => AddToCart(product)} className='bg-blue-500 shadow-md text-white py-2 px-4 rounded-md'>
							{isItemInCart(product.id) ? 'Remove from Cart' : 'Add to Cart'}
						</button>
					</div>

				</div>
			</div>
		</>
	);
};

export default ProductDetails;
