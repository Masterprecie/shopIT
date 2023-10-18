import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

const initialState = {
	cart: []
};

const cartReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TO_CART': {
			return { cart: [...state.cart, action.payload] };
		}

		case 'UPDATE_QUANTITY': {
			const updatedCart = state.cart.map((item) =>
				item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
			);
			return { cart: updatedCart };
		}

		case 'REMOVE_FROM_CART':
			return { cart: state.cart.filter(item => item.id !== action.payload.id) };

		case 'CLEAR_CART':
			return { cart: [] };
		default:
			return state;
	}
}


export const CartProvider = ({ children }) => {
	const [cartState, dispatch] = useReducer(cartReducer, initialState);

	// functions to add item to cart
	const addToCart = (product) => {
		dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });
	};

	// functions to remove item from cart
	const removeFromCart = (product) => {
		alert('Are you sure you want to remove this item from cart?')
		dispatch({ type: 'REMOVE_FROM_CART', payload: product });
	};

	// functions to get the number of items added to cart 
	const getCartCount = () => {
		return cartState.cart.length;
	};

	// functions to clear cart
	const clearCart = () => {
		alert('Are you sure you want to clear your cart?')
		dispatch({ type: 'CLEAR_CART' });
	};

	// functions to update the quantity in the cart
	const updateQuantity = (product, quantity) => {
		dispatch({ type: 'UPDATE_QUANTITY', payload: { id: product.id, quantity } });
		// Recalculates the total cart value
		const updatedTotalCartValue = cartState.cart.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
		dispatch({ type: 'UPDATE_TOTAL_VALUE', payload: updatedTotalCartValue });
	};


	// functions to calculate total
	const getTotalCartValue = () => {
		const total = cartState.cart.reduce((total, item) => total + item.price * item.quantity, 0);
		return total.toFixed(2); // Format the total to 2 decimal places
	};

	return (
		<CartContext.Provider value={{ cartState, addToCart, removeFromCart, getCartCount, getTotalCartValue, updateQuantity, clearCart }}>
			{children}
		</CartContext.Provider>
	);
}

CartProvider.propTypes = {
	children: PropTypes.node,
};



