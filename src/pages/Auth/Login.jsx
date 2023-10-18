import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const Login = () => {

	const { logIn } = useAuthContext();
	const navigate = useNavigate()
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');



	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			await logIn(email, password);
			navigate("/");
		} catch (error) {

			console.error(error.message);
		}
	};

	return (
		<div className="lg:w-1/4 md:w-1/2 m-auto px-5 md:px-0 md:pt-16 pt-8 h-[100vh]">
			<h2 className="text-3xl text-center font-semibold mb-4">Login</h2>
			<form onSubmit={handleLogin}>
				<div className="mb-4">
					<label>Email:</label>
					<input
						required
						type="email"
						placeholder='Enter your Email'
						value={email}
						onChange={(e) =>
							setEmail(e.target.value)
						}
						className="w-full border p-2 rounded text-black "
					/>
				</div>
				<div className="mb-4">
					<label>Password:</label>
					<input
						required
						type="password"
						value={password}
						placeholder='Password must be atleast 6 characters'
						onChange={(e) =>
							setPassword(e.target.value)
						}
						className="w-full border p-2 rounded text-black"
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"

				>
					Login
				</button>
			</form>

			<p className='font-medium pt-3'>
				Don&rsquo;t have an account? <span className='text-purple-500'> <Link to="/register">Register</Link> </span>
			</p>
		</div>
	);
};

export default Login;
