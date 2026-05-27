import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function HowToOrder() {
  const [cmsContent, setCmsContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/pages')
      .then(res => { if (res.data['how-to-order']?.content) setCmsContent(res.data['how-to-order'].content); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const steps = [
    { num: '01', title: 'Browse Koleksi', desc: 'Jelajahi koleksi terbaru kami di halaman Product.' },
    { num: '02', title: 'Pilih Produk', desc: 'Pilih produk yang diinginkan dan klik "Beli Sekarang".' },
    { num: '03', title: 'Tambah ke Keranjang', desc: 'Produk akan masuk ke keranjang belanja Anda secara otomatis.' },
    { num: '04', title: 'Checkout', desc: 'Buka halaman keranjang dan tekan "Checkout Sekarang".' },
    { num: '05', title: 'Verifikasi Pesanan', desc: 'Tim Arcanum akan memverifikasi pesanan dan menghubungi Anda untuk konfirmasi pembayaran.' },
    { num: '06', title: 'Pengiriman', desc: 'Setelah pembayaran dikonfirmasi, pesanan akan segera dikirimkan ke alamat Anda.' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-xs tracking-[0.4em] uppercase text-gray-600 dark:text-gray-500 font-mono mb-4 text-center">— Panduan —</p>
        <h1 className="text-5xl italic font-bold mb-4 uppercase tracking-widest text-center">How to Order</h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-16">Memesan dari Arcanum semudah ini.</p>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-2 border-black/20 dark:border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        ) : cmsContent ? (
          <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-8">
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">{cmsContent}</div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {steps.map(step => (
              <div key={step.num} className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-6 flex items-start gap-6">
                <span className="text-4xl font-bold italic text-black dark:text-white/20 min-w-[56px]">{step.num}</span>
                <div>
                  <h3 className="font-bold italic text-lg mb-1">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link to="/products" className="bg-white text-black font-bold italic px-10 py-4 rounded-full inline-block hover:bg-gray-200 transition uppercase tracking-widest">
            Mulai Belanja
          </Link>
        </div>
      </div>
    </div>
  );
}
