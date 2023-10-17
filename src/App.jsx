import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import ProductDetails from "./pages/Product/ProductDetails"
import { ToastContainer } from "react-toastify"
import { useThemeContext } from "./context/useThemeContext"
import { darkTheme, lightTheme } from "./utils/constant"




function App() {
  const { theme } = useThemeContext();
  const themeStyles = theme === 'light' ? lightTheme : darkTheme;

  return (
    <div style={
      {
        backgroundColor: themeStyles.backgroundColor,
        color: themeStyles.textColor,
      }
    }>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
