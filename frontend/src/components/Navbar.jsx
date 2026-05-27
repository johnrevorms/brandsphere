import { ShoppingCart, User, LogOut, Moon, Sun } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import api from '../api/axios';

const STORAGE_URL = 'http://localhost:8000/storage/';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);
  const [logoDarkUrl, setLogoDarkUrl] = useState(null);

  useEffect(() => {
    api.get('/settings').then(res => {
      if (res.data.site_logo) {
        const val = res.data.site_logo;
        setLogoUrl(val.startsWith('http') ? val : `${STORAGE_URL}${val}`);
      }
      if (res.data.site_logo_dark) {
        const val = res.data.site_logo_dark;
        setLogoDarkUrl(val.startsWith('http') ? val : `${STORAGE_URL}${val}`);
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

  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Dalam mode Terang, teks menjadi hitam jika sedang di-scroll ATAU jika sedang tidak berada di halaman Home
  // (karena halaman lain latarnya putih). Pada mode Gelap, otomatis putih.
  const isLightModeDarkText = isScrolled || !isHomePage;

  const textColorClass = isLightModeDarkText ? "text-black dark:text-white" : "text-white";
  const hoverClass = isLightModeDarkText ? "hover:text-gray-600 dark:hover:text-gray-400" : "hover:text-gray-400";
  const bgClass = isLightModeDarkText ? "bg-black dark:bg-white" : "bg-white";

  const useDarkLogo = theme === 'light' && isLightModeDarkText && logoDarkUrl;
  const activeLogo = useDarkLogo ? logoDarkUrl : logoUrl;

  const badgeTextClass = isLightModeDarkText ? "text-white dark:text-black" : "text-black";

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-black/10 dark:border-white/10 shadow-lg' : 'bg-transparent py-2'}`}>
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Left Section: Logo */}
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
          {activeLogo ? (
            <img
              src={activeLogo}
              alt="Arcanum Logo"
              className="h-10 max-w-[140px] object-contain"
            />
          ) : (
            <span className={`text-2xl font-bold italic tracking-widest uppercase ${textColorClass}`}>
              Arcanum
            </span>
          )}
        </Link>

        {/* Right Section: Navigation Links & Icons */}
        <div className="flex items-center gap-8">
          
          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 font-bold text-xs md:text-sm tracking-widest uppercase">
            <Link to="/products" className={`${textColorClass} ${hoverClass} transition-colors relative group`}>
              Product
              <span className={`absolute -bottom-2 left-0 w-0 h-0.5 ${bgClass} transition-all group-hover:w-full`}></span>
            </Link>
            <Link to="/blog" className={`${textColorClass} ${hoverClass} transition-colors relative group`}>
              Blog
              <span className={`absolute -bottom-2 left-0 w-0 h-0.5 ${bgClass} transition-all group-hover:w-full`}></span>
            </Link>
            <Link to="/about" className={`${textColorClass} ${hoverClass} transition-colors relative group`}>
              Tentang
              <span className={`absolute -bottom-2 left-0 w-0 h-0.5 ${bgClass} transition-all group-hover:w-full`}></span>
            </Link>
            <Link to="/careers" className={`${textColorClass} ${hoverClass} transition-colors relative group`}>
              Karir
              <span className={`absolute -bottom-2 left-0 w-0 h-0.5 ${bgClass} transition-all group-hover:w-full`}></span>
            </Link>
            {user && (
              <Link to="/orders" className={`${textColorClass} ${hoverClass} transition-colors relative group`}>
                Pesanan
                <span className={`absolute -bottom-2 left-0 w-0 h-0.5 ${bgClass} transition-all group-hover:w-full`}></span>
              </Link>
            )}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-6 bg-white/20"></div>

          {/* User & Cart Icons */}
          <div className="flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className={`text-[11px] font-bold tracking-widest uppercase hidden md:block ${textColorClass} ${hoverClass} transition-colors`}>
                  {user.name.split(' ')[0]}
                </Link>
                <button onClick={handleLogout} className={`${textColorClass} hover:text-red-500 transition-colors`} title="Logout">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className={`${textColorClass} ${hoverClass} transition-colors`} title="Login">
                <User className="w-5 h-5" />
              </Link>
            )}

            <Link to="/cart" className={`${textColorClass} ${hoverClass} transition-colors relative`} title="Keranjang">
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className={`absolute -top-1.5 -right-1.5 ${bgClass} ${badgeTextClass} text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full`}>
                  {cart.length}
                </span>
              )}
            </Link>

            <button onClick={toggleTheme} className={`${textColorClass} ${hoverClass} transition-colors`} title="Toggle Theme">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          
        </div>
      </div>
    </nav>
  );
}
