import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useTheme } from '../context/ThemeContext';

export default function Home() {
  const { theme } = useTheme();
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const res = await api.get('/products');
        setProducts(res.data.slice(0, 4)); // Get top 4
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingProducts(false);
      }
    };
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        setSettings(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchProducts();
    fetchSettings();
  }, []);

  const getPromos = () => {
    const promoList = [];
    let i = 0;
    while (settings[`promo_${i}_title`] !== undefined || settings[`promo_${i}_image`] !== undefined) {
      promoList.push({
        title: settings[`promo_${i}_title`] || (i === 0 ? 'One More Devil?' : 'NEW ARRIVAL'),
        image: settings[`promo_${i}_image`]
          ? `http://localhost:8000/storage/${settings[`promo_${i}_image`]}`
          : null,
      });
      i++;
      if (i >= 15) break; // safety cap
    }

    // Fallback if settings are not loaded yet or no promos are configured at all:
    if (promoList.length === 0) {
      promoList.push({
        title: 'One More Devil?',
        image: null,
      });
      promoList.push({
        title: 'NEW ARRIVAL',
        image: null,
      });
    }

    return promoList;
  };

  const Marquee = () => (
    <div className="w-full bg-white dark:bg-black border-y border-black/20 dark:border-white/20 py-2 overflow-hidden flex whitespace-nowrap">
      <div className="animate-marquee inline-block text-xs font-bold italic tracking-[0.2em] uppercase w-max">
        {Array(20).fill(settings.marquee_text || "ONE MORE").map((text, i) => (
          <span key={i} className="mx-8">{text}</span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col bg-white dark:bg-black text-black dark:text-white">
      {/* Hero Image */}
      <div
        className="relative w-full min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: settings.hero_image ? `url(http://localhost:8000/storage/${settings.hero_image})` : 'none' }}
      >
      </div>

      <Marquee />

      {/* Split Section */}
      <div className={`w-full grid grid-cols-1 ${getPromos().length === 1
        ? ''
        : getPromos().length === 2
          ? 'md:grid-cols-2'
          : 'sm:grid-cols-2 lg:grid-cols-3'
        }`}>
        {getPromos().map((promo, idx) => {
          const lowerTitle = (promo.title || '').toLowerCase();
          const isBlog = lowerTitle.includes('blog') || lowerTitle.includes('devil') || idx === 0;
          const linkPath = isBlog ? '/blog' : '/products';
          const linkLabel = isBlog ? 'BLOG' : 'SHOP';
          const buttonStyle = isBlog
            ? "border border-white hover:bg-white hover:text-black transition-colors rounded-full px-8 py-2 text-sm font-bold uppercase tracking-widest backdrop-blur-sm"
            : "bg-white text-black hover:bg-gray-200 transition-colors rounded-full px-8 py-2 text-sm font-bold uppercase tracking-widest";

          return (
            <div
              key={idx}
              className="relative aspect-square md:aspect-auto md:h-[60vh] bg-gray-900 flex flex-col justify-end p-8 sm:p-12 bg-cover bg-center group"
              style={{ backgroundImage: promo.image ? `url(${promo.image})` : 'none' }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500"></div>
              <div className="relative z-10 flex flex-col items-start text-white">
                <h2 className="text-3xl sm:text-4xl italic font-bold mb-4 drop-shadow-lg uppercase">{promo.title}</h2>
                <Link to={linkPath} className={buttonStyle}>
                  {linkLabel}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <Marquee />

      {/* Bottom Mascot Section (Enter The Unknown) */}
      <div className="w-full bg-white dark:bg-neutral-950 border-t border-black/10 dark:border-white/10 pt-20 pb-6 flex items-center justify-center transition-colors duration-300">
        <div className="max-w-[1400px] w-full px-1 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Mascot Image Area (Left) */}
          <div className="relative w-full md:col-span-7 flex items-center justify-center group">
            {(theme === 'light' && settings.mascot_image_dark) || (theme === 'dark' && settings.mascot_image) || settings.mascot_image ? (
              <img
                src={theme === 'light' && settings.mascot_image_dark ? `http://localhost:8000/storage/${settings.mascot_image_dark}` : `http://localhost:8000/storage/${settings.mascot_image}`}
                alt="Arcanum Mascot"
                className="w-full max-h-[75vh] object-contain transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-[60vh] bg-black/5 dark:bg-white/5 rounded-2xl flex items-center justify-center text-black/50 dark:text-white/20 italic font-mono uppercase tracking-widest">
                No Mascot Image
              </div>
            )}
          </div>

          {/* Title Area (Right) */}
          <div className="flex flex-col justify-center items-start text-left md:col-span-5">
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black italic tracking-tighter uppercase whitespace-pre-line leading-none text-black dark:text-white drop-shadow-2xl">
              {settings.bottom_title || "ENTER\nTHE UNKNOWN"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-6 max-w-md text-sm sm:text-base tracking-wider">
              Manifestation of streetwear, dark aesthetic, and raw subculture expression. Uncompromising standards of urban clothing.
            </p>
            <Link to="/tentang" className="bg-black dark:bg-white text-white dark:text-black px-10 py-3.5 rounded-full font-bold tracking-widest uppercase hover:bg-gray-800 dark:hover:bg-gray-300 transition-colors mt-8 text-sm">
              LEARN MORE
            </Link>
          </div>
        </div>
      </div>

      {/* Top Seller Section */}
      <div className="max-w-[1400px] mx-auto w-full px-6 pt-6 pb-24 flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl italic font-bold mb-6 uppercase">TOP SELLER</h2>
        <Link to="/products" className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors rounded-full px-10 py-2.5 text-sm font-bold uppercase tracking-widest mb-16">
          SHOP
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
          {loadingProducts ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse flex flex-col">
                <div className="aspect-[3/4] bg-white/5 rounded-xl mb-4"></div>
                <div className="h-5 bg-white/10 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-white/10 rounded w-1/2"></div>
              </div>
            ))
          ) : (
            products.map((item) => (
              <Link to={`/products/${item.id}`} key={item.id} className="group cursor-pointer flex flex-col">
                <div className="aspect-[3/4] bg-gray-50 dark:bg-gray-900 mb-4 overflow-hidden rounded-xl">
                  {item.image_path ? (
                    <img src={`http://localhost:8000/storage/${item.image_path}`} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700">No Image</div>
                  )}
                </div>
                <h3 className="font-bold italic text-lg line-clamp-1">{item.name}</h3>
                <p className="text-gray-700 dark:text-gray-300 font-mono mb-1">Rp {item.price.toLocaleString('id-ID')}</p>
                {item.stock_status === 'Out of Stock' && <span className="text-xs text-red-500 font-bold uppercase tracking-widest mt-1">Out of Stock</span>}
              </Link>
            ))
          )}
          {!loadingProducts && products.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-600 dark:text-gray-500 italic">Belum ada produk yang dirilis.</div>
          )}
        </div>
      </div>


    </div>
  );
}
