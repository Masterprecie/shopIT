import { useCartContext } from "../../context/UseCartContext";

const Cart = () => {
	const { cartState } = useCartContext();

	return (
		<div>
			<h2>Cart</h2>
			<ul>
				{cartState.items.map((item, index) => (
					<li key={index}>

						<p>Name: {item.title}</p>
						<p>Price: ${item.price}</p>
						<p>Quantity: {item.quantity}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Cart;
