import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function PrivacyPolicy() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/pages')
      .then(res => { if (res.data.privacy?.content) setContent(res.data.privacy.content); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <p className="text-xs tracking-[0.4em] uppercase text-gray-600 dark:text-gray-500 font-mono mb-4 text-center">— Kebijakan —</p>
        <h1 className="text-5xl italic font-bold mb-16 uppercase tracking-widest text-center">Privacy Policy</h1>

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
              <h2 className="font-bold italic text-xl mb-4">Komitmen Privasi</h2>
              <p>Arcanum menghormati privasi Anda dan berkomitmen untuk melindungi setiap informasi pribadi yang Anda bagikan kepada kami.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-6">
              <h2 className="font-bold italic text-xl mb-4">Data yang Dikumpulkan</h2>
              <p>Kami hanya mengumpulkan data yang diperlukan untuk memproses pesanan Anda, meningkatkan pengalaman berbelanja, dan memberikan layanan yang lebih baik. Data tersebut meliputi nama, alamat, email, dan detail pembayaran.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-6">
              <h2 className="font-bold italic text-xl mb-4">Keamanan Data</h2>
              <p>Informasi Anda tidak akan pernah dijual atau dibagikan kepada pihak ketiga di luar kebutuhan operasional (seperti pengiriman dan pemrosesan pembayaran). Dengan menggunakan website kami, Anda menyetujui kebijakan ini.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
