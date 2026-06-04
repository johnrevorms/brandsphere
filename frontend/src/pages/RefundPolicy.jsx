import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function RefundPolicy() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/pages')
      .then(res => { if (res.data.refund?.content) setContent(res.data.refund.content); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <p className="text-xs tracking-[0.4em] uppercase text-gray-600 dark:text-gray-500 font-mono mb-4 text-center">— Kebijakan —</p>
        <h1 className="text-5xl italic font-bold mb-16 uppercase tracking-widest text-center">Refund Policy</h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-black/20 dark:border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        ) : content ? (
          <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-8">
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{content}</div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-6">
              <h2 className="font-bold italic text-xl mb-4">Ketentuan Pengembalian</h2>
              <p>Semua pembelian di Arcanum diproses dengan teliti untuk memastikan kualitas sebelum pengiriman. Pengembalian atau refund hanya diterima jika:</p>
              <ul className="mt-4 flex flex-col gap-2 list-disc list-inside text-gray-600 dark:text-gray-400">
                <li>Barang yang diterima cacat atau rusak</li>
                <li>Barang yang dikirimkan tidak sesuai pesanan</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-6">
              <h2 className="font-bold italic text-xl mb-4">Cara Mengajukan</h2>
              <p>Pengajuan refund harus dilakukan dalam 3–5 hari setelah menerima produk, disertai bukti pembelian dan kondisi produk (foto/video).</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-6">
              <h2 className="font-bold italic text-xl mb-4">Pengecualian</h2>
              <p>Refund tidak berlaku untuk:</p>
              <ul className="mt-4 flex flex-col gap-2 list-disc list-inside text-gray-600 dark:text-gray-400">
                <li>Perubahan selera (change of mind)</li>
                <li>Salah pilih ukuran</li>
                <li>Barang yang sudah dipakai atau dicuci</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
