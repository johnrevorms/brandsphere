import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function TermsConditions() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/pages')
      .then(res => { if (res.data.terms?.content) setContent(res.data.terms.content); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-xs tracking-[0.4em] uppercase text-gray-600 dark:text-gray-500 font-mono mb-4 text-center">— Legal —</p>
        <h1 className="text-5xl italic font-bold mb-16 uppercase tracking-widest text-center">Terms & Conditions</h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-black/20 dark:border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        ) : content ? (
          <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-8">
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">{content}</div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-6">
              <h2 className="font-bold italic text-xl mb-4">Penggunaan Website</h2>
              <p>Dengan menggunakan website Arcanum, Anda menyetujui seluruh ketentuan yang berlaku. Konten website ini dilindungi hak cipta dan tidak boleh digunakan tanpa izin.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-6">
              <h2 className="font-bold italic text-xl mb-4">Transaksi & Pembayaran</h2>
              <p>Semua transaksi diproses secara aman. Arcanum berhak membatalkan pesanan yang terindikasi penipuan atau melanggar ketentuan.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-6">
              <h2 className="font-bold italic text-xl mb-4">Perubahan Ketentuan</h2>
              <p>Arcanum berhak memperbarui Syarat & Ketentuan ini sewaktu-waktu. Penggunaan website setelah perubahan berarti Anda menyetujui ketentuan yang baru.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
