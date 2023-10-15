import { useContext } from "react";
import { UserContext } from "./UserContext";

export const useAuthContext = () => {
	return useContext(UserContext);
}