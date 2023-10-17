
import { FiSun, FiMoon } from 'react-icons/fi'; 
import { useThemeContext } from '../context/useThemeContext';

const ToggleIcon = () => {
	const { theme, toggleTheme } = useThemeContext();

	return (
		<div onClick={toggleTheme}>
			{theme === 'light' ? <FiMoon /> : <FiSun />}
		</div>
	);
};

export default ToggleIcon;
