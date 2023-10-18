import { BsCart4 } from 'react-icons/bs';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useCartContext } from '../context/UseCartContext';
import CartSidebar from '../pages/Cart/CartSidebar';
import { useState } from 'react';
import PropTypes from 'prop-types'
import ToggleIcon from './ToggleIcon';
import { useThemeContext } from '../context/useThemeContext';

const NavBar = ({ onSearch }) => {
	const { theme } = useThemeContext();
	const { user, logOut } = useAuthContext();
	const { getCartCount } = useCartContext();

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	// Function to handle search query change
	const handleSearch = (e) => {
		const query = e.target.value;
		setSearchQuery(query);
		onSearch(query);
	};

	// Function to open the cart sidebar
	const openSidebar = () => {
		setIsSidebarOpen(true);
	};

	// Function to close the cart sidebar
	const closeSidebar = () => {
		setIsSidebarOpen(false);
	};

	// Function to toggle the mobile menu
	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};



	const customBgClass = theme === 'light' ? 'bg-white' : 'bg-gray-900';


	return (
		<>

			<div className=' z-20 fixed w-full' >
				<nav className={`flex w-full items-center ${customBgClass} justify-between shadow-lg p-5 px-4 md:px-4 lg:px-16`}>
					<div className='font-bold text-2xl sm:text-3xl'>
						shopIT
					</div>

					<div className='flex gap-5 items-center'>
						<div className='block md:hidden'>
							<ToggleIcon />
						</div>
						<div className='relative md:hidden block' onClick={openSidebar}>

							<div className='absolute bottom-4 left-4 text-xs text-white rounded-full h-2 w-2 bg-red-500 items-center justify-center flex p-2'>
								{getCartCount()}
							</div>
							<BsCart4 size={25} />
						</div>
						{/* Mobile menu icon */}
						<div className="sm:hidden">
							<button onClick={toggleMobileMenu}>
								<HiOutlineMenuAlt3 />
							</button>
						</div>

					</div>


					<div className="hidden sm:block">
						<input
							type='search'
							name=''
							id=''
							placeholder='Search'
							className='border rounded-md p-2 outline-0 w-[300px]  text-black'
							value={searchQuery}
							onChange={handleSearch}
						/>
					</div>

					<div className="hidden sm:flex items-center gap-4">
						{user ? (
							<>
								<div className='font-semibold'>
									Welcome, {user.displayName}
								</div>
								<div className='font-semibold'>
									<button onClick={() => logOut()}>Logout</button>
								</div>
								<ToggleIcon />
							</>
						) : (
							<>
								<div className='font-semibold'>
									<Link to='/login'>Login</Link>
								</div>
								<div className='font-semibold'>
									<Link to='/register'>Register</Link>
								</div>
								<ToggleIcon />
							</>
						)}

						<div className='relative' onClick={openSidebar}>
							<div className='absolute bottom-5 left-4 text-xs text-white rounded-full h-3 w-3 bg-red-500 items-center justify-center flex p-3'>
								{getCartCount()}
							</div>
							<BsCart4 size={30} />
						</div>
					</div>
				</nav>

				{/* Mobile menu */}
				{isMobileMenuOpen && (
					<div className={`sm:hidden ${customBgClass} shadow-lg p-4`}>
						{user ? (
							<>
								<div className='font-semibold'>
									Welcome, {user.displayName}
								</div>
								<div className='font-semibold mt-3'>
									<button onClick={() => logOut()} className='bg-red-500 p-2 text-white rounded-md' >Logout</button>
								</div>
							</>
						) : (
							<>
								<div className='font-semiboldmb-3 mb-5'>
									<button className=' bg-gray-500 p-2 px-7 text-white rounded-md'>
										<Link to='/login' onClick={toggleMobileMenu}>
											Login
										</Link>
									</button>

								</div>
								<div className='font-semibold'>
									<button className=' bg-green-500 p-2 px-5 text-white rounded-md'>
										<Link to='/register' onClick={toggleMobileMenu}>
											Register
										</Link>
									</button>
								</div>
							</>
						)}

						<div className="block my-3">
							<input
								type='search'
								name=''
								id=''
								placeholder='Search'
								className='border rounded-md p-2 outline-0 w-full  text-black'
								value={searchQuery}
								onChange={handleSearch}
							/>
						</div>
					</div>
				)}

				{isSidebarOpen && <CartSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />}

			</div>
		</>
	);
}
NavBar.propTypes = {
	onSearch: PropTypes.func.isRequired,
}
export default NavBar;
