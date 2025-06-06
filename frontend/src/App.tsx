import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Navigation from './components/Navigation';
import Welcome from './components/Welcome';
import About from './components/About';
import Footer from './components/Footer';
import Products from './components/entity/product/Products';
import Suppliers from './components/entity/supplier/Suppliers';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import CartPage from './components/cart/CartPage';
import AdminProducts from './components/admin/AdminProducts';
import RandomFartOnClick from './components/RandomFartOnClick';
import queryClient from './api/query';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>          <Router>
            <div className="flex flex-col min-h-screen bg-dark">
              <Navigation />
              <main className="flex-grow">
                <Routes>                <Route path="/" element={<Welcome />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/suppliers" element={<Suppliers />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/admin/products" element={<AdminProducts />} />
                </Routes>
              </main>
              <Footer />
              <RandomFartOnClick />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
