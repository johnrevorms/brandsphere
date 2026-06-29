import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Products() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  const filterRef = useRef(null);

  const { addToCart } = useCart();
  const { user } = useAuth();

  const categories = ['Semua', 'TSHIRT', 'TROUSERS', 'JACKET', 'ACCESORIES'];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get('/products');
        setProducts(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (filterRef.current) {
        const offset = filterRef.current.getBoundingClientRect().top;
        setIsSticky(offset <= 80); // 80px is navbar height approx
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'Semua' || p.category === activeCategory;
    const matchesSearch = (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    if (!user) {
      showToast("Silakan login terlebih dahulu untuk berbelanja.");
      return;
    }
    addToCart(product);
    showToast(`${product.name} dimasukkan ke keranjang!`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-32 pb-12">
      {/* Sticky Filter & Search Bar */}
      <div
        ref={filterRef}
        className={`w-full z-40 transition-all duration-300 ${isSticky ? 'fixed top-20 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-black/10 dark:border-white/10 py-3 md:py-4 shadow-lg' : 'relative mb-8 md:mb-12'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col md:flex-row gap-3 md:gap-4 justify-between items-center">
          {/* Categories */}
          <div className="flex overflow-x-auto gap-2 pb-1 md:pb-0 hide-scrollbar w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 md:px-6 md:py-2 rounded-full border whitespace-nowrap text-[10px] md:text-sm font-bold tracking-widest uppercase transition-all ${activeCategory === cat
                  ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                  : 'bg-transparent text-gray-500 dark:text-gray-400 border-black/10 dark:border-white/20 hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64 flex-shrink-0">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full py-1.5 md:py-2 pl-4 pr-10 text-[11px] md:text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder-gray-400"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 transition-all duration-300 ${isSticky ? 'pt-28' : ''}`}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
          {loading ? (
            Array(8).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse flex flex-col">
                <div className="aspect-[3/4] bg-gray-100 dark:bg-white/5 rounded-xl mb-4"></div>
                <div className="h-2 md:h-3 bg-gray-200 dark:bg-white/10 rounded w-1/3 mb-2"></div>
                <div className="h-4 md:h-6 bg-gray-200 dark:bg-white/10 rounded w-3/4 mb-4"></div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="h-3 md:h-4 bg-gray-200 dark:bg-white/10 rounded w-1/4"></div>
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200 dark:bg-white/10"></div>
                </div>
              </div>
            ))
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} onClick={() => navigate(`/products/${product.id}`)} className="group cursor-pointer flex flex-col">
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-xl mb-3 md:mb-4 border border-black/5 dark:border-white/5">
                  {product.image_path ? (
                    <img
                      src={`${import.meta.env.VITE_STORAGE_URL}${product.image_path}`}
                      alt={product.name}
                      className="w-full h-full object-cover grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 tracking-widest uppercase">No Image</div>
                  )}

                  {/* Overlay UI (Desktop mostly) */}
                  <div className="absolute inset-0 bg-black/5 dark:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      disabled={product.stock_status === 'Out of Stock'}
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                      className="bg-black text-white dark:bg-white dark:text-black px-3 md:px-6 py-2 md:py-3 rounded-full text-[9px] md:text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
                    >
                      <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                      {product.stock_status === 'Out of Stock' ? 'Habis' : 'Beli Sekarang'}
                    </button>
                  </div>

                  {/* Stock Status Tag */}
                  {product.stock_status === 'Out of Stock' && (
                    <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-red-500 text-white text-[8px] md:text-[10px] font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full uppercase tracking-widest shadow-lg">
                      Habis
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-grow px-1">
                  <p className="text-[9px] md:text-xs text-gray-500 mb-0.5 md:mb-1 font-mono tracking-widest uppercase">{product.category}</p>
                  <h3 className="text-xs md:text-lg font-medium tracking-wide uppercase mb-2 line-clamp-1 leading-snug">{product.name}</h3>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="font-mono text-[11px] md:text-sm font-bold text-gray-800 dark:text-gray-200">Rp {product.price.toLocaleString('id-ID')}</p>
                    <button
                      disabled={product.stock_status === 'Out of Stock'}
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                      className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-black/10 dark:border-white/20 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-3 h-3 md:w-4 md:h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <Filter className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-4 opacity-30" />
            <p className="text-sm md:text-xl font-light tracking-wider">Koleksi untuk kategori ini belum tersedia.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Inline Plus icon since it wasn't imported at the top
function Plus(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
