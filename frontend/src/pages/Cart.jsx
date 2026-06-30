import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, CreditCard, ShoppingCart } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';

export default function Cart() {
  const { showToast } = useToast();
  const { cart, removeFromCart, updateQuantity, clearCart, removeMultipleFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState(() => cart.map(i => i.cartItemId || i.id));

  // Promo Code States
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoCodeApplied, setPromoCodeApplied] = useState('');
  const [applyingPromo, setApplyingPromo] = useState(false);
  const [promoError, setPromoError] = useState('');

  // Shipping states
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [costs, setCosts] = useState([]);

  // Form states
  const [address, setAddress] = useState('');
  const [provinceId, setProvinceId] = useState('');
  const [cityId, setCityId] = useState('');
  const [courier, setCourier] = useState('');
  const [service, setService] = useState('');
  const [shippingCost, setShippingCost] = useState(0);

  const selectedCartItems = cart.filter(item => selectedItems.includes(item.cartItemId || item.id));
  const subTotal = selectedCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalQuantity = selectedCartItems.reduce((sum, item) => sum + Number(item.quantity), 0);
  const totalWeight = selectedCartItems.reduce((sum, item) => sum + (500 * item.quantity), 0); // 500g per item
  
  const discountAmount = Math.floor(subTotal * (promoDiscount / 100));
  const finalTotal = subTotal - discountAmount + shippingCost;

  const handleApplyPromo = async () => {
    setPromoError('');
    if (!promoCodeInput.trim()) return;
    
    setApplyingPromo(true);
    try {
      const res = await api.post('/promos/validate', { 
        code: promoCodeInput, 
        quantity: totalQuantity 
      });
      setPromoDiscount(res.data.discount_percentage);
      setPromoCodeApplied(res.data.code);
      showToast(res.data.message, 'success');
    } catch (e) {
      setPromoDiscount(0);
      setPromoCodeApplied('');
      setPromoError(e.response?.data?.error || 'Gagal memvalidasi promo');
      showToast(e.response?.data?.error || 'Promo tidak valid', 'error');
    } finally {
      setApplyingPromo(false);
    }
  };

  const handleRemovePromo = () => {
    setPromoDiscount(0);
    setPromoCodeApplied('');
    setPromoCodeInput('');
    setPromoError('');
    showToast('Promo dilepas', 'success');
  };

  const toggleSelectItem = (id) => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const [shippingError, setShippingError] = useState(null);

  useEffect(() => {
    // Fetch provinces
    api.get('/shipping/provinces')
      .then(res => setProvinces(res.data))
      .catch(err => {
        console.error(err);
        setShippingError('Gagal terhubung ke API Pengiriman (RajaOngkir). Mungkin API sedang gangguan atau timeout.');
      });
  }, []);

  useEffect(() => {
    if (user) {
      if (!address && user.address) setAddress(user.address);
      if (!provinceId && user.province_id) setProvinceId(user.province_id);
      if (!cityId && user.city_id) setCityId(user.city_id);
    }
  }, [user]);

  useEffect(() => {
    if (provinceId) {
      api.get(`/shipping/cities/${provinceId}`).then(res => {
        setCities(res.data);
        setCityId('');
        setCosts([]);
        setShippingCost(0);
        setService('');
      }).catch(console.error);
    }
  }, [provinceId]);

  useEffect(() => {
    if (cityId && courier && cart.length > 0) {
      api.post('/shipping/cost', {
        origin: '137', // Example: Jakarta Pusat (Komerce ID)
        destination: cityId,
        weight: totalWeight,
        courier: courier
      }).then(res => {
        setCosts(res.data);
      }).catch(console.error);
    }
  }, [cityId, courier, totalWeight, cart.length]);

  const handleCheckout = async () => {
    if (!user) {
      showToast("Anda harus login untuk melanjutkan.");
      navigate('/login');
      return;
    }

    if (selectedCartItems.length === 0) {
      showToast("Pilih setidaknya satu produk untuk di-checkout.");
      return;
    }

    if (!address || !provinceId || !cityId || !courier || !service) {
      showToast("Lengkapi alamat dan pilih layanan pengiriman.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        total_price: finalTotal,
        shipping_address: address,
        shipping_city_id: cityId,
        shipping_province_id: provinceId,
        shipping_courier: courier,
        shipping_service: service,
        shipping_cost: shippingCost,
        items: selectedCartItems.map(i => ({
          product_id: i.id,
          quantity: i.quantity,
          price: i.price,
          size: i.size || 'L'
        }))
      };

      const res = await api.post('/orders', payload);
      const snapToken = res.data.snap_token;
      const orderId = res.data.order.id;

      // Call Midtrans Snap
      if (window.snap) {
        window.snap.pay(snapToken, {
          onSuccess: async function (result) {
            try {
              await api.put(`/orders/${orderId}/status`, { status: 'Proses Packing' });
            } catch (e) { console.error(e); }
            removeMultipleFromCart(selectedItems);
            navigate('/payment-success');
          },
          onPending: function (result) {
            removeMultipleFromCart(selectedItems);
            navigate('/orders');
          },
          onError: function (result) {
            showToast('Pembayaran gagal!');
            setLoading(false);
          },
          onClose: function () {
            showToast('Anda menutup popup tanpa menyelesaikan pembayaran.');
            navigate('/orders');
            setLoading(false);
          }
        });
      } else {
        showToast("Sistem pembayaran belum siap, coba lagi nanti.");
        setLoading(false);
      }

    } catch (e) {
      console.error(e);
      showToast('Terjadi kesalahan saat memproses pesanan.');
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-32 pb-12 px-6 md:px-12 lg:px-16 flex flex-col items-center justify-center">
        <ShoppingCart className="w-16 h-16 text-black dark:text-white/40 mb-8" strokeWidth={1} />
        <h1 className="text-2xl font-light tracking-[0.2em] uppercase mb-4 text-center">Keranjang Kosong</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10 text-center text-sm tracking-widest font-light">Belum ada mahakarya yang Anda pilih.</p>
        <Link to="/products" className="border border-white/50 text-black dark:text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500">
          Eksplorasi Koleksi
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <h1 className="text-3xl md:text-5xl font-light tracking-[0.15em] uppercase mb-16 text-center">
          <span className="font-bold italic">Keranjang Belanja</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items & Shipping Form */}
          <div className="flex-1 space-y-12">

            {/* Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4">
                <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-black dark:text-white/70">Daftar Produk</h2>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <span className="text-xs text-black dark:text-white/70 group-hover:text-white transition-colors uppercase tracking-widest font-medium">Pilih Semua</span>
                  <div className={`w-4 h-4 flex items-center justify-center border transition-all duration-300 ${selectedItems.length === cart.length && cart.length > 0 ? 'bg-white border-white' : 'border-white/50 group-hover:border-white/90'}`}>
                    {selectedItems.length === cart.length && cart.length > 0 && <div className="w-2 h-2 bg-white dark:bg-black" />}
                  </div>
                  <input type="checkbox" className="hidden" onChange={() => {
                    if (selectedItems.length === cart.length) setSelectedItems([]);
                    else setSelectedItems(cart.map(i => i.cartItemId || i.id));
                  }} />
                </label>
              </div>
              {cart.map((item) => (
                <div key={item.cartItemId || item.id} className="flex gap-2.5 md:gap-8 bg-white/[0.01] hover:bg-white/[0.02] transition-colors p-3 md:p-6 border-b border-black/10 dark:border-white/10 group">
                  {/* Checkbox */}
                  <div className="flex items-center justify-center">
                    <label className="cursor-pointer group p-1">
                      <div className={`w-4 h-4 md:w-5 md:h-5 flex items-center justify-center border transition-all duration-300 ${(selectedItems.includes(item.cartItemId || item.id)) ? 'bg-black border-black dark:bg-white dark:border-white' : 'border-black/30 dark:border-white/50 group-hover:border-black/70 dark:group-hover:border-white/90'}`}>
                        {(selectedItems.includes(item.cartItemId || item.id)) && <div className="w-2 h-2 bg-white dark:bg-black" />}
                      </div>
                      <input type="checkbox" className="hidden"
                        checked={selectedItems.includes(item.cartItemId || item.id)}
                        onChange={() => toggleSelectItem(item.cartItemId || item.id)}
                      />
                    </label>
                  </div>

                  {/* Image */}
                  <div className="w-16 h-24 md:w-28 md:h-36 bg-gray-100 dark:bg-white/5 overflow-hidden flex-shrink-0 relative">
                    {item.image_path ? (
                      <img src={`${import.meta.env.VITE_STORAGE_URL}${item.image_path}`} alt={item.name} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[8px] text-gray-400 tracking-widest uppercase">No Img</div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="pr-1 md:pr-2">
                        <p className="text-[9px] md:text-[10px] text-gray-500 dark:text-gray-400 font-mono tracking-widest uppercase mb-1">{item.category}</p>
                        <h3 className="text-xs md:text-lg font-medium tracking-wide uppercase line-clamp-2 leading-snug">{item.name}</h3>
                        <p className="text-[10px] md:text-xs font-mono text-gray-600 dark:text-gray-400 mt-1 md:mt-2">Size: {item.size || 'L'}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.cartItemId || item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1 md:p-2" title="Hapus Produk">
                        <Trash2 className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3 md:mt-6 border-t border-black/5 dark:border-white/10 pt-3 md:pt-4">
                      <p className="font-mono text-xs md:text-sm tracking-widest font-bold">IDR {item.price.toLocaleString('id-ID')}</p>

                      <div className="flex items-center gap-3 md:gap-4 bg-gray-100 dark:bg-white/5 rounded-full px-2 py-1 md:px-3 md:py-1.5 border border-black/5 dark:border-white/10">
                        <button onClick={() => updateQuantity(item.cartItemId || item.id, -1)} className="text-gray-500 hover:text-black dark:hover:text-white transition-colors p-1"><Minus className="w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={2} /></button>
                        <span className="font-mono text-xs md:text-sm w-4 md:w-5 text-center font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartItemId || item.id, 1)} className="text-gray-500 hover:text-black dark:hover:text-white transition-colors p-1"><Plus className="w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={2} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping Form */}
            <div className="space-y-8 bg-white/[0.02] backdrop-blur-xl border border-black/10 dark:border-white/10 p-6 md:p-10">
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-black dark:text-white/70 border-b border-black/20 dark:border-white/20 pb-4">Info Pengiriman</h2>

              {shippingError && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 text-sm font-bold">
                  {shippingError}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-mono text-black dark:text-white/70 tracking-widest uppercase mb-3">Alamat Lengkap</label>
                  <textarea
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full bg-transparent border-b border-white/30 pb-2 text-sm text-black dark:text-white focus:outline-none focus:border-white transition-colors resize-none h-16 placeholder-white/40"
                    placeholder="Nama Jalan, RT/RW, Kelurahan, Kecamatan..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-mono text-black dark:text-white/70 tracking-widest uppercase mb-3">Provinsi</label>
                    <select
                      value={provinceId}
                      onChange={e => setProvinceId(e.target.value)}
                      className="w-full bg-transparent border-b border-white/30 pb-2 text-sm text-black dark:text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
                    >
                      <option value="" className="bg-white dark:bg-black text-gray-600 dark:text-gray-400">Pilih Provinsi</option>
                      {provinces.map(p => (
                        <option key={p.province_id} value={p.province_id} className="bg-white dark:bg-black text-black dark:text-white">{p.province}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-black dark:text-white/70 tracking-widest uppercase mb-3">Kota/Kabupaten</label>
                    <select
                      value={cityId}
                      onChange={e => setCityId(e.target.value)}
                      disabled={!provinceId}
                      className="w-full bg-transparent border-b border-white/30 pb-2 text-sm text-black dark:text-white focus:outline-none focus:border-white transition-colors disabled:opacity-30 cursor-pointer"
                    >
                      <option value="" className="bg-white dark:bg-black text-gray-600 dark:text-gray-400">Pilih Kota</option>
                      {cities.map(c => (
                        <option key={c.city_id} value={c.city_id} className="bg-white dark:bg-black text-black dark:text-white">{c.type} {c.city_name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-black/10 dark:border-white/10">
                  <div>
                    <label className="block text-xs font-mono text-black dark:text-white/70 tracking-widest uppercase mb-3">Kurir</label>
                    <select
                      value={courier}
                      onChange={e => setCourier(e.target.value)}
                      className="w-full bg-transparent border-b border-white/30 pb-2 text-sm text-black dark:text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
                    >
                      <option value="" className="bg-white dark:bg-black text-gray-600 dark:text-gray-400">Pilih Kurir</option>
                      <option value="jne" className="bg-white dark:bg-black text-black dark:text-white">JNE</option>
                      <option value="jnt" className="bg-white dark:bg-black text-black dark:text-white">J&T Express</option>
                      <option value="pos" className="bg-white dark:bg-black text-black dark:text-white">POS Indonesia</option>
                      <option value="tiki" className="bg-white dark:bg-black text-black dark:text-white">TIKI</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-black dark:text-white/70 tracking-widest uppercase mb-3">Layanan (Ongkir)</label>
                    <select
                      value={service}
                      onChange={e => {
                        setService(e.target.value);
                        const selectedCost = costs.find(c => c.service === e.target.value);
                        if (selectedCost) setShippingCost(selectedCost.cost[0].value);
                      }}
                      disabled={!costs.length}
                      className="w-full bg-transparent border-b border-white/30 pb-2 text-sm text-black dark:text-white focus:outline-none focus:border-white transition-colors disabled:opacity-30 cursor-pointer"
                    >
                      <option value="" className="bg-white dark:bg-black text-gray-600 dark:text-gray-400">Pilih Layanan</option>
                      {costs.map(c => (
                        <option key={c.service} value={c.service} className="bg-white dark:bg-black text-black dark:text-white">
                          {c.service} - IDR {c.cost[0].value.toLocaleString('id-ID')} ({c.cost[0].etd} hr)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

              </div>
            </div>

          </div>

          <div className="w-full lg:w-[400px]">
            <div className="bg-white/[0.02] backdrop-blur-xl border border-black/10 dark:border-white/10 p-6 md:p-10 sticky top-32">
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-black dark:text-white/70 border-b border-black/20 dark:border-white/20 pb-4 mb-8">Ringkasan Pesanan</h2>

              {/* Promo Code Section */}
              <div className="mb-8">
                <label className="block text-xs font-mono text-black dark:text-white/70 tracking-widest uppercase mb-3">Kode Promo (Grosir/Diskon)</label>
                {!promoCodeApplied ? (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCodeInput}
                        onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                        placeholder="KODE PROMO"
                        className="w-full bg-transparent border-b border-black/30 dark:border-white/30 pb-2 text-sm text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors uppercase placeholder-gray-400 dark:placeholder-white/40"
                      />
                      <button
                        onClick={handleApplyPromo}
                        disabled={applyingPromo || !promoCodeInput}
                        className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-bold text-[10px] uppercase tracking-widest hover:opacity-80 disabled:opacity-50 transition-colors whitespace-nowrap"
                      >
                        {applyingPromo ? '...' : 'Terapkan'}
                      </button>
                    </div>
                    {promoError && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-wide">{promoError}</p>}
                  </div>
                ) : (
                  <div className="flex justify-between items-center bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 rounded-md">
                    <div>
                      <p className="text-xs font-bold tracking-widest text-green-700 dark:text-green-400">{promoCodeApplied}</p>
                      <p className="text-[10px] font-bold tracking-widest text-green-600 dark:text-green-500 mt-1">Diskon {promoDiscount}% digunakan!</p>
                    </div>
                    <button onClick={handleRemovePromo} className="text-red-500 hover:text-red-700 p-1 bg-red-50 dark:bg-red-900/20 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-5 mb-10">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-black dark:text-white/80 tracking-wider">Subtotal</span>
                  <span className="font-mono tracking-widest">IDR {subTotal.toLocaleString('id-ID')}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between items-center text-sm text-green-600 dark:text-green-400">
                    <span className="tracking-wider">Diskon ({promoDiscount}%)</span>
                    <span className="font-mono tracking-widest">- IDR {discountAmount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-black dark:text-white/80 tracking-wider">Ongkos Kirim</span>
                  <span className="font-mono tracking-widest">IDR {shippingCost.toLocaleString('id-ID')}</span>
                </div>
                <div className="h-px bg-white/10 my-6"></div>
                <div className="flex justify-between items-end">
                  <span className="text-sm tracking-[0.2em] uppercase font-bold text-black dark:text-white/80">Total</span>
                  <span className="font-mono text-xl tracking-widest">IDR {finalTotal.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-white text-black py-4 font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Memproses...' : 'Selesaikan Pembayaran'}
              </button>
              <p className="text-[10px] text-black dark:text-white/50 text-center mt-6 tracking-widest uppercase leading-relaxed">
                Terintegrasi dengan gerbang pembayaran aman Midtrans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
