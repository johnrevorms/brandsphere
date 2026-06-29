import { useEffect, useMemo, useState } from 'react';
import { MessageSquare, MessageSquareReply, Search, Star, Trash2 } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import api from '../../api/axios';
import { useToast } from '../../context/ToastContext';

function StarRating({ value }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= value ? 'fill-black dark:fill-white text-black dark:text-white' : 'text-gray-300 dark:text-gray-700'}`}
        />
      ))}
    </div>
  );
}



export default function AdminReviews() {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState([]);
  const [replyDrafts, setReplyDrafts] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchReviews = async () => {
    try {
      const res = await api.get('/reviews');
      setReviews(res.data);
      setReplyDrafts(res.data.reduce((acc, review) => {
        acc[review.id] = review.admin_reply || '';
        return acc;
      }, {}));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchReviews();
  }, []);



  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const filteredReviews = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();

    if (!keyword) return reviews;

    return reviews.filter((review) => {
      return [
        review.customer_name,
        review.user?.email,
        review.comment,
        review.admin_reply,
      ].some((value) => value?.toLowerCase().includes(keyword));
    });
  }, [reviews, searchQuery]);

  const repliedCount = reviews.filter((review) => review.admin_reply).length;
  const averageRating = reviews.length
    ? reviews.reduce((total, review) => total + Number(review.rating || 0), 0) / reviews.length
    : 0;

  const handleReply = async (id) => {
    try {
      await api.put(`/reviews/${id}/reply`, { admin_reply: (replyDrafts[id] || '').trim() });
      showToast('Balasan ulasan berhasil disimpan.');
      fetchReviews();
    } catch (e) {
      console.error(e);
      showToast(e.response?.data?.message || 'Gagal menyimpan balasan ulasan.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Hapus ulasan ini?')) return;

    try {
      await api.delete(`/reviews/${id}`);
      showToast('Berhasil di delete.');
      fetchReviews();
    } catch (e) {
      console.error(e);
      showToast(e.response?.data?.message || 'Gagal menghapus ulasan.');
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-gray-500 mb-3">Customer Feedback</p>
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tight uppercase text-black dark:text-white">Ulasan Customer</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-3">Pantau, balas, dan rapikan ulasan yang masuk dari halaman customer.</p>
        </div>

        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari ulasan..."
            className="w-full bg-white dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors"
          />
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
        <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-6">
          <MessageSquare className="w-5 h-5 text-gray-500 mb-8" />
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Total Ulasan</p>
          <p className="text-3xl font-black italic">{reviews.length}</p>
        </div>
        <div className="bg-black dark:bg-white text-white dark:text-black border border-black/10 dark:border-white/10 rounded-2xl p-6">
          <MessageSquareReply className="w-5 h-5 opacity-70 mb-8" />
          <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-3">Sudah Dibalas</p>
          <p className="text-3xl font-black italic">{repliedCount}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-6">
          <Star className="w-5 h-5 text-gray-500 mb-8" />
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Rating Display</p>
          <p className="text-3xl font-black italic">{averageRating.toFixed(1)}</p>
        </div>
      </section>

      <div className="space-y-5">
        {loading ? (
          <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-3xl p-10 text-center text-gray-600 dark:text-gray-500 italic">
            Memuat ulasan...
          </div>
        ) : filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <article key={review.id} className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-3xl p-5 md:p-6">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white dark:bg-black border border-black/10 dark:border-white/10 flex items-center justify-center font-black">
                      {(review.customer_name || 'C').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <h2 className="font-black italic uppercase tracking-wide">{review.customer_name}</h2>
                        <StarRating value={review.rating} />
                      </div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-1">{formatDate(review.created_at)}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(review.id)}
                    className="self-start md:self-auto bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/20 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-red-500/20 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Hapus
                  </button>
                </div>

                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed italic">"{review.comment}"</p>

                {review.admin_reply && (
                  <div className="bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-2xl p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">Balasan Admin</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{review.admin_reply}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
                  <textarea
                    value={replyDrafts[review.id] || ''}
                    onChange={(e) => setReplyDrafts((prev) => ({ ...prev, [review.id]: e.target.value }))}
                    rows="2"
                    placeholder={review.admin_reply ? 'Tulis balasan baru...' : 'Tulis balasan admin...'}
                    className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none"
                  />
                  <button
                    onClick={() => handleReply(review.id)}
                    className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition"
                  >
                    <MessageSquareReply className="w-4 h-4" />
                    Reply
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-3xl p-10 text-center text-gray-600 dark:text-gray-500 italic">
            Tidak ada ulasan yang cocok.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
