// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAdYIrtTV0JkrWYgKZJyIS5DYwIHZC65R4",
	authDomain: "presh-store.firebaseapp.com",
	projectId: "presh-store",
	storageBucket: "presh-store.appspot.com",
	messagingSenderId: "361755046394",
	appId: "1:361755046394:web:71d5c06e735b448eebf443"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);