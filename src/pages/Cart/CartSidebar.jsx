import { useCartContext } from '../../context/UseCartContext';
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import emptycart from '../../assets/emptycart.webp'
import PropTypes from 'prop-types'

const CartSidebar = ({ isOpen, onClose }) => {
	const { cartState, removeFromCart, getTotalCartValue, updateQuantity, clearCart } = useCartContext();
	const { cart } = cartState;
	const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);

	const closeSidebar = () => {
		setIsSidebarOpen(false);
		onClose(); // Notify the parent component (NavBar) that the sidebar is closed.
	};

	const handleQuantityChange = (item, newQuantity) => {
		// Ensure the new quantity is within the range [1, Infinity]
		newQuantity = Math.max(1, newQuantity);

		// Update the quantity of the item in the cart
		updateQuantity(item, newQuantity);
	};
	return (

		<div
			className={`fixed right-0 top-0 h-screen w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-64'
				}`}
		>
			<div className="p-4 border-b flex items-center justify-between">
				<h2 className="text-lg font-bold">Cart</h2>
				<div className="px-4">
					<button
						onClick={closeSidebar}
					>
						<FaTimes size={20} />
					</button>
				</div>

			</div>
			{
				cart.length === 0 ? (
					<div className='flex items-center flex-col font-semibold'>
						<img src={emptycart} alt="img" width='70%' />
						<p>Your cart is empty.</p>
					</div>
				) : (
					<>

						<div className="p-4 max-h-[400px] overflow-y-auto ">
							{cart.map((item) => (
								<div key={item.id} className=" items-center justify-between mb-4">
									<div className="flex items-center">
										<img src={item.image} alt="" className="w-16 h-16 object-contain mr-4" />
										<div>
											<p className="font-bold">{item.title}</p>
											<p className="text-sm font-semibold text-black">Price: <span className=' text-gray-500'> ${item.price}</span></p>
										</div>
									</div>
									<div className="flex items-center justify-between ml-20 ">
										<div className="flex items-center ">
											<button className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-l-lg" onClick={() => handleQuantityChange(item, item.quantity - 1)}>-</button>
											<p className="px-2">{item.quantity}</p>

											<button className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-r-lg" onClick={() => handleQuantityChange(item, item.quantity + 1)}>+</button>
										</div>

										<div>
											<span>${item.price * item.quantity}
											</span>
										</div>
									</div>
									<div className='text-right'>
										<button className='bg-red-500 text-white p-1 rounded-md' onClick={() => removeFromCart(item)}>Remove</button>
									</div>
								</div>
							))}
							<div className="flex justify-between border-t pt-4">
								<p className="font-bold">Total:</p>
								<p className="font-bold">${getTotalCartValue()}</p>
							</div>
						</div>

						<div className="p-4">
							<button
								className="bg-red-500 text-white p-2 rounded-md w-full mb-4"
								onClick={clearCart}
							>
								Clear Cart
							</button>
							<button className="bg-blue-500 text-white p-2 rounded-md w-full">
								Checkout
							</button>
						</div>
					</>
				)
			}
		</div>
	);
}

CartSidebar.propTypes = {
	isOpen: PropTypes.func,
	onClose: PropTypes.func

}
export default CartSidebar;
