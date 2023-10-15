import { CartContext } from "./CartContext";
import { useContext } from "react";

export const useCartContext = () => {
	return useContext(CartContext);
}
