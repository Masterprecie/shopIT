import { createContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	onAuthStateChanged,
	signOut,
} from 'firebase/auth';
import { auth } from '../firebase';
import PropTypes from 'prop-types'

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState({});

	const logIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const signUp = async (email, password, username) => {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;
		await updateProfile(user, {
			displayName: username,
		});
		setUser(user);
	};

	const logOut = () => {
		return signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
			setUser(currentuser);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<UserContext.Provider value={{ user, logIn, signUp, logOut }}>
			{children}
		</UserContext.Provider>
	);
};


UserContextProvider.propTypes = {
	children: PropTypes.node
}




