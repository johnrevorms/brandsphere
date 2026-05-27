import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function FAQ() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  const defaultItems = [
    { q: "How long does shipping take?", a: "Orders are typically processed within 1–3 business days and delivered within 3–7 days depending on your location." },
    { q: "Can I change my order after payment?", a: "Changes can only be made before the order is processed by our team. Please contact us immediately after placing your order." },
    { q: "Do you accept custom design requests?", a: "Currently Arcanum focuses on ready-to-wear collections only. Stay tuned for future collaborations." },
    { q: "How do I know my size?", a: "Size charts are available on each product page for reference. When in doubt, size up." },
    { q: "Is my payment secure?", a: "Yes, all payments are processed through secure, verified payment gateways. Your data is never stored on our servers." },
  ];

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/pages');
        if (res.data.faq?.content) {
          setContent(res.data.faq.content);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-xs tracking-[0.4em] uppercase text-gray-600 dark:text-gray-500 font-mono mb-4 text-center">— Info —</p>
        <h1 className="text-5xl italic font-bold mb-16 uppercase tracking-widest text-center">FAQ</h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-black/20 dark:border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        ) : content ? (
          /* CMS-managed content */
          <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-8">
            <div className="prose prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {content}
            </div>
          </div>
        ) : (
          /* Fallback default content */
          <div className="flex flex-col gap-8">
            {defaultItems.map((item, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-6">
                <p className="font-bold italic text-lg mb-3">Q: {item.q}</p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">A: {item.a}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
