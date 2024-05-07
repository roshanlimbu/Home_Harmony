import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSingup';
import Footer from './Components/Footer/Footer';
import banner from './Components/Assets/banner.png'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/office' element={<ShopCategory banner={banner} category="office" />} />
          <Route path='/Kitchenware' element={<ShopCategory banner={banner} category="Kitchenware" />} />
          <Route path='/decor' element={<ShopCategory banner={banner} category="decor" />} />
          <Route path="/product" element={<Product />} >
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div >
  );
}

export default App;
