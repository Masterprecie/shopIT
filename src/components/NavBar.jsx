import { BsCart4 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useCartContext } from '../context/UseCartContext';
import CartSidebar from '../pages/Cart/CartSidebar';
import { useState } from 'react';

const NavBar = () => {
	const { user, logOut } = useAuthContext();
	const { getCartCount } = useCartContext();

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

	return (
		<div>
			<nav className="flex items-center justify-between shadow-lg p-5 px-4 sm:px-16">
				<div className='font-bold text-2xl sm:text-3xl'>
					shopIT
				</div>

				<div className='flex gap-5 items-center'>
					<div className='relative lg:hidden block' onClick={openSidebar}>
						<div className='absolute bottom-4 left-4 text-xs text-white rounded-full h-2 w-2 bg-red-500 items-center justify-center flex p-2'>
							{getCartCount()}
						</div>
						<BsCart4 size={25} />
					</div>
					{/* Mobile menu icon */}
					<div className="sm:hidden">
						<button onClick={toggleMobileMenu}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 text-black"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
					</div>

				</div>


				<div className="hidden sm:block">
					<input
						type="search"
						name=""
						id=""
						placeholder='Search'
						className='border rounded-md p-2 outline-0 w-[300px]'
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
						</>
					) : (
						<>
							<div className='font-semibold'>
								<Link to='/login'>Login</Link>
							</div>
							<div className='font-semibold'>
								<Link to='/register'>Register</Link>
							</div>
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
				<div className="sm:hidden bg-white shadow-lg p-4">
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
					<div className='font-semibold relative hidden' onClick={openSidebar}>
						<div className='absolute bottom-5 left-4 text-xs text-white rounded-full h-3 w-3 bg-red-500 items-center justify-center flex p-3'>
							{getCartCount()}
						</div>
						<BsCart4 size={30} />
					</div>
				</div>
			)}

			{isSidebarOpen && <CartSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />}
		</div>
	);
}

export default NavBar;
