import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

function Register() {
	const { signUp } = useAuthContext();
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isFormValid, setIsFormValid] = useState(false);

	const handleRegister = async (e) => {
		e.preventDefault();

		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		if (!emailRegex.test(email)) {
			setError('Invalid email address');
			return;
		}

		try {
			await signUp(email, password, username);
			navigate('/login');
		} catch (error) {
			setError(error.message);
		}
	}
	const handleInputChange = () => {
		setIsFormValid(username.trim() !== '' && email.trim() !== '' && password.trim() !== '');
	};
	return (
		<div className="md:w-1/2 lg:w-1/4  m-auto px-5 md:px-0 md:pt-16 pt-8 h-[100vh] ">
			<h2 className="text-3xl font-semibold mb-4 text-center">Register</h2>
			<form onSubmit={handleRegister}>
				<div className="mb-4">
					<label>Username:</label>
					<input
						required
						type="text"
						value={username}
						placeholder='Enter your username'
						onChange={(e) => {
							setUsername(e.target.value)
							handleInputChange()
						}}
						className="w-full border p-2 rounded  text-black"
					/>
				</div>
				<div className="mb-4">
					<label>Email:</label>
					<input
						required
						type="email"
						value={email}
						placeholder='Enter your Email'
						onChange={(e) => {
							setEmail(e.target.value)
							handleInputChange();
						}}
						className="w-full border p-2 rounded  text-black"
					/>
				</div>
				<div className="mb-4">
					<label>Password:</label>
					<input
						required
						type="password"
						placeholder='Password must be atleast 6 characters'
						value={password}
						onChange={(e) => {
							setPassword(e.target.value)
							handleInputChange()
						}
						}
						className="w-full border p-2 rounded  text-black"
					/>
				</div>
				<button
					disabled={!isFormValid}
					className={`p-2 rounded w-full ${isFormValid ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-200 text-gray-700'}`}
					type="submit"
				>
					Register
				</button>
			</form>
			{error && <p className="text-red-500">{error}</p>}
			<p className='font-medium pt-3'>
				Already have an account? <span className='text-purple-500'> <Link to="/login">Login</Link></span>
			</p>
		</div>
	);
}

export default Register;

