import { ShoppingCart, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import api from '../api/axios';

const STORAGE_URL = 'http://localhost:8000/storage/';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);

  useEffect(() => {
    api.get('/settings').then(res => {
      if (res.data.site_logo) {
        const val = res.data.site_logo;
        setLogoUrl(val.startsWith('http') ? val : `${STORAGE_URL}${val}`);
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10 shadow-lg' : 'bg-transparent py-2'}`}>
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Left Section: Logo */}
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Arcanum Logo"
              className="h-10 max-w-[140px] object-contain"
            />
          ) : (
            <span className="text-2xl font-bold italic tracking-widest uppercase text-white">
              Arcanum
            </span>
          )}
        </Link>

        {/* Right Section: Navigation Links & Icons */}
        <div className="flex items-center gap-8">
          
          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 font-bold text-xs md:text-sm tracking-widest uppercase">
            <Link to="/products" className="text-white hover:text-gray-400 transition-colors relative group">
              Product
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/blog" className="text-white hover:text-gray-400 transition-colors relative group">
              Blog
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/about" className="text-white hover:text-gray-400 transition-colors relative group">
              Tentang
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/careers" className="text-white hover:text-gray-400 transition-colors relative group">
              Karir
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </Link>
            {user && (
              <Link to="/orders" className="text-white hover:text-gray-400 transition-colors relative group">
                Pesanan
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
              </Link>
            )}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-6 bg-white/20"></div>

          {/* User & Cart Icons */}
          <div className="flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="text-[11px] font-bold tracking-widest uppercase hidden md:block text-gray-300 hover:text-white transition-colors">
                  {user.name.split(' ')[0]}
                </Link>
                <button onClick={handleLogout} className="text-white hover:text-red-400 transition-colors" title="Logout">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-white hover:text-gray-400 transition-colors" title="Login">
                <User className="w-5 h-5" />
              </Link>
            )}

            <Link to="/cart" className="text-white hover:text-gray-400 transition-colors relative" title="Keranjang">
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
          
        </div>
      </div>
    </nav>
  );
}
