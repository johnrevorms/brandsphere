import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Star, Trash2, X } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

function StarRating({ value, interactive = false, onChange, size = 'md' }) {
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => interactive && onChange(star)}
          disabled={!interactive}
          aria-label={`${star} star rating`}
          className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
        >
          <Star
            className={`${iconSize} ${star <= value ? 'fill-black dark:fill-white text-black dark:text-white' : 'text-gray-300 dark:text-gray-700'}`}
          />
        </button>
      ))}
    </div>
  );
}



export default function Reviews() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const fetchReviews = async () => {
    try {
      const res = await api.get('/reviews');
      setReviews(res.data);
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
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleCancel = () => {
    setRating(5);
    setComment('');
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    if (!confirm('Submit this review?')) return;

    setSubmitting(true);
    setMessage('');

    try {
      await api.post('/reviews', { rating, comment });
      setComment('');
      setRating(5);
      setMessage('Thank you. Your review has been submitted.');
      showToast('Berhasil disubmit.');
      fetchReviews();
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Unable to submit your review.';
      setMessage(errorMessage);
      showToast(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this review?')) return;

    try {
      await api.delete(`/reviews/${id}`);
      showToast('Berhasil di delete.');
      fetchReviews();
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Unable to delete your review.';
      setMessage(errorMessage);
      showToast(errorMessage);
    }
  };

  const canDeleteReview = (review) => {
    return user && review.user_id === user.id;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <p className="text-xs tracking-[0.4em] uppercase text-gray-600 dark:text-gray-500 font-mono mb-4 text-center">Reviews</p>
        <h1 className="text-3xl md:text-4xl italic font-bold mb-10 uppercase tracking-widest text-center">Customer Reviews</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
          <section className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-5 md:p-6">
            <h2 className="text-xl font-bold italic tracking-wide mb-2">Leave a Review</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Share your rating and experience with Arcanum.</p>

            {user ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-2">Customer Name</label>
                  <input
                    value={user.name}
                    disabled
                    className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-2">Rating</label>
                  <StarRating value={rating} interactive onChange={setRating} />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-2">Comment</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="4"
                    required
                    minLength="5"
                    placeholder="Write your review here..."
                    className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none"
                  />
                </div>

                {message && <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition disabled:opacity-60"
                  >
                    <Send className="w-4 h-4" />
                    {submitting ? 'Submitting' : 'Submit'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-white dark:bg-black border border-black/20 dark:border-white/20 font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 transition"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="border border-black/10 dark:border-white/10 rounded-2xl p-6 bg-white dark:bg-black">
                <p className="text-gray-600 dark:text-gray-400 mb-5">Please sign in before submitting a review.</p>
                <Link to="/login" className="inline-flex bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gray-800 dark:hover:bg-gray-200 transition">
                  Login
                </Link>
              </div>
            )}
          </section>

          <section className="flex flex-col gap-4">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-2 border-black/20 dark:border-white/20 border-t-black dark:border-t-white rounded-full animate-spin" />
              </div>
            ) : reviews.length > 0 ? (
              reviews.map((review) => (
                <article key={review.id} className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-bold italic text-base">{review.customer_name}</h3>
                      <p className="text-[11px] uppercase tracking-widest text-gray-500 mt-1">Uploaded {formatDate(review.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <StarRating value={review.rating} size="sm" />
                      {canDeleteReview(review) && (
                        <button
                          onClick={() => handleDelete(review.id)}
                          className="bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/20 p-2 rounded-lg hover:bg-red-500/20 transition"
                          aria-label="Delete review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{review.comment}</p>
                  {review.admin_reply && (
                    <div className="mt-4 border-l-2 border-black dark:border-white pl-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Admin Reply</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{review.admin_reply}</p>
                    </div>
                  )}
                </article>
              ))
            ) : (
              <div className="bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-3xl p-10 text-center text-gray-600 dark:text-gray-500 italic">
                No customer reviews yet.
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
