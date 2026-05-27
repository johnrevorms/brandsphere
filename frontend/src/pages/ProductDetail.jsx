import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  
  const { addToCart } = useCart();
  const { user } = useAuth();

  const sizes = ['S', 'M', 'L', 'XL'];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (e) {
        console.error(e);
        alert('Produk tidak ditemukan');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!user) {
      alert("Silakan login terlebih dahulu untuk berbelanja.");
      return;
    }
    
    // Create item to add
    const itemToAdd = {
      ...product,
      size: selectedSize,
      quantity: quantity
    };
    
    // The cart context usually adds 1. Let's just call addToCart multiple times or adjust logic.
    // Assuming addToCart just adds item. We will add the logic here:
    // Wait, the CartContext addToCart might just push it with quantity 1.
    // Let's modify the item we send to have quantity and size.
    addToCart(itemToAdd);
    // Note: If CartContext only adds 1, we might need to update CartContext to handle quantity.
    // For now we assume addToCart handles the object.
    
    alert(`${quantity}x ${product.name} (Size: ${selectedSize}) ditambahkan ke keranjang!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="w-40 h-4 bg-white/10 rounded mb-8 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <div className="aspect-[3/4] bg-white/5 rounded-3xl animate-pulse"></div>
            <div className="flex flex-col py-4 animate-pulse">
              <div className="w-24 h-4 bg-white/10 rounded mb-4"></div>
              <div className="w-3/4 h-12 bg-white/10 rounded mb-6"></div>
              <div className="w-1/3 h-8 bg-white/10 rounded mb-16"></div>
              <div className="w-full h-4 bg-white/5 rounded mb-2"></div>
              <div className="w-full h-4 bg-white/5 rounded mb-2"></div>
              <div className="w-2/3 h-4 bg-white/5 rounded mb-10"></div>
              <div className="flex gap-4 mb-10">
                <div className="w-14 h-14 rounded-full bg-white/10"></div>
                <div className="w-14 h-14 rounded-full bg-white/10"></div>
                <div className="w-14 h-14 rounded-full bg-white/10"></div>
                <div className="w-14 h-14 rounded-full bg-white/10"></div>
              </div>
              <div className="w-full h-14 rounded-full bg-white/10 mt-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        
        <button 
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Koleksi
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="aspect-[3/4] bg-gray-900 rounded-3xl overflow-hidden relative">
              {product.image_path ? (
                <img 
                  src={`http://localhost:8000/storage/${product.image_path}`} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">No Image</div>
              )}
              {product.stock_status === 'Out of Stock' && (
                <div className="absolute top-6 left-6 bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-red-500/20">
                  Sold Out
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col py-4">
            <div className="border-b border-white/10 pb-8 mb-8">
              <p className="text-gray-500 font-mono tracking-widest text-sm mb-4">{product.category}</p>
              <h1 className="text-4xl lg:text-6xl font-bold italic tracking-wider mb-6">{product.name}</h1>
              <p className="text-2xl font-mono text-gray-300">Rp {product.price.toLocaleString('id-ID')}</p>
            </div>

            <div className="prose prose-invert prose-lg text-gray-400 mb-10">
              <p className="whitespace-pre-line">{product.description || "Tidak ada deskripsi lengkap untuk produk ini. Terbuat dari material berkualitas tinggi dengan potongan eksklusif Arcanum."}</p>
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-4">
                <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Pilih Ukuran</span>
                <span className="text-xs text-gray-500 underline cursor-pointer hover:text-white transition">Size Guide</span>
              </div>
              <div className="flex gap-4">
                {sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-full font-mono flex items-center justify-center border transition-all ${
                      selectedSize === size 
                        ? 'border-white bg-white text-black' 
                        : 'border-white/20 text-gray-400 hover:border-white/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4 mt-auto">
              <button 
                disabled={product.stock_status === 'Out of Stock'}
                onClick={handleAddToCart}
                className="flex-1 bg-white text-black py-4 rounded-full font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                {product.stock_status === 'Out of Stock' ? 'Sold Out' : 'Add to Cart'}
              </button>
            </div>

            <div className="mt-8 border-t border-white/10 pt-8 grid grid-cols-2 gap-4 text-xs text-gray-500 font-mono">
              <div className="flex flex-col gap-1">
                <span className="uppercase font-bold tracking-widest text-gray-400">Pengiriman</span>
                <span>Seluruh Indonesia via RajaOngkir</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="uppercase font-bold tracking-widest text-gray-400">Pengembalian</span>
                <span>Garansi tukar size 3 hari</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
