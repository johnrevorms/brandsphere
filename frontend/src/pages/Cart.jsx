import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, CreditCard, ShoppingCart } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, removeMultipleFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState(() => cart.map(i => i.cartItemId || i.id));

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
  const totalWeight = selectedCartItems.reduce((sum, item) => sum + (500 * item.quantity), 0); // 500g per item
  const finalTotal = subTotal + shippingCost;

  const toggleSelectItem = (id) => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  useEffect(() => {
    // Fetch provinces
    api.get('/shipping/provinces').then(res => setProvinces(res.data)).catch(console.error);
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
        origin: '152', // Example: Jakarta Pusat
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
      alert("Anda harus login untuk melanjutkan.");
      navigate('/login');
      return;
    }

    if (selectedCartItems.length === 0) {
      alert("Pilih setidaknya satu produk untuk di-checkout.");
      return;
    }

    if (!address || !provinceId || !cityId || !courier || !service) {
      alert("Lengkapi alamat dan pilih layanan pengiriman.");
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
            alert('Pembayaran gagal!');
            setLoading(false);
          },
          onClose: function () {
            alert('Anda menutup popup tanpa menyelesaikan pembayaran.');
            navigate('/orders');
            setLoading(false);
          }
        });
      } else {
        alert("Sistem pembayaran belum siap, coba lagi nanti.");
        setLoading(false);
      }

    } catch (e) {
      console.error(e);
      alert('Terjadi kesalahan saat memproses pesanan.');
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-32 pb-12 px-4 flex flex-col items-center justify-center">
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
      <div className="max-w-7xl mx-auto px-4 md:px-8">
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
                <div key={item.cartItemId || item.id} className="flex gap-4 md:gap-8 bg-white/[0.01] hover:bg-white/[0.02] transition-colors p-4 md:p-6 border-b border-black/10 dark:border-white/10 group">
                  <div className="flex items-center justify-center">
                    <label className="cursor-pointer group p-2">
                      <div className={`w-5 h-5 flex items-center justify-center border transition-all duration-300 ${(selectedItems.includes(item.cartItemId || item.id)) ? 'bg-white border-white' : 'border-white/50 group-hover:border-white/90'}`}>
                        {(selectedItems.includes(item.cartItemId || item.id)) && <div className="w-2.5 h-2.5 bg-white dark:bg-black" />}
                      </div>
                      <input type="checkbox" className="hidden"
                        checked={selectedItems.includes(item.cartItemId || item.id)}
                        onChange={() => toggleSelectItem(item.cartItemId || item.id)}
                      />
                    </label>
                  </div>
                  <div className="w-28 h-36 bg-white/5 overflow-hidden flex-shrink-0">
                    {item.image_path ? (
                      <img src={`http://localhost:8000/storage/${item.image_path}`} alt={item.name} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-black dark:text-white/60 tracking-widest uppercase">No Img</div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[10px] text-black dark:text-white/70 font-mono tracking-widest uppercase mb-2">{item.category}</p>
                        <h3 className="text-xl font-light tracking-wider uppercase">{item.name}</h3>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-xs font-mono text-black dark:text-white/80 border border-white/30 px-3 py-1">Size: {item.size || 'L'}</span>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.cartItemId || item.id)} className="text-black dark:text-white/50 hover:text-white transition-colors p-2">
                        <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-6 border-t border-black/10 dark:border-white/10 pt-4">
                      <p className="font-mono text-sm tracking-widest text-black dark:text-white/90">IDR {item.price.toLocaleString('id-ID')}</p>

                      <div className="flex items-center gap-4 bg-transparent">
                        <button onClick={() => updateQuantity(item.cartItemId || item.id, -1)} className="text-black dark:text-white/70 hover:text-white transition-colors p-1"><Minus className="w-3 h-3" strokeWidth={1.5} /></button>
                        <span className="font-mono text-sm w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartItemId || item.id, 1)} className="text-black dark:text-white/70 hover:text-white transition-colors p-1"><Plus className="w-3 h-3" strokeWidth={1.5} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping Form */}
            <div className="space-y-8 bg-white/[0.02] backdrop-blur-xl border border-black/10 dark:border-white/10 p-8 md:p-10">
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-black dark:text-white/70 border-b border-black/20 dark:border-white/20 pb-4">Info Pengiriman</h2>

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
            <div className="bg-white/[0.02] backdrop-blur-xl border border-black/10 dark:border-white/10 p-8 md:p-10 sticky top-32">
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-black dark:text-white/70 border-b border-black/20 dark:border-white/20 pb-4 mb-8">Ringkasan Pesanan</h2>

              <div className="space-y-5 mb-10">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-black dark:text-white/80 tracking-wider">Subtotal</span>
                  <span className="font-mono tracking-widest">IDR {subTotal.toLocaleString('id-ID')}</span>
                </div>
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
