import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ isbn: '', review: '', rating: 5 });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reviews');
        setReviews(response.data);
      } catch (error) {
        setError('Failed to load reviews. Please try again later.');
      }
    };
    fetchReviews();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/reviews',
        newReview,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewReview({ isbn: '', review: '', rating: 5 });
      setSuccess('Review submitted successfully!');
      setError('');

      // Refresh reviews after submission
      const response = await axios.get('http://localhost:5000/api/reviews');
      setReviews(response.data);
    } catch (error) {
      setSuccess('');
      setError(error.response?.data?.error || 'Failed to submit review. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">Reviews</h1>

        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-center mb-4">{success}</p>
        )}

        {/* Review Submission Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-8 bg-gray-100 p-6 rounded-lg shadow">
          <div className="space-y-3">
            <input
              type="text"
              value={newReview.isbn}
              onChange={(e) => setNewReview({ ...newReview, isbn: e.target.value })}
              placeholder="Enter ISBN Number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <textarea
              value={newReview.review}
              onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
              placeholder="Write your review..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num} Stars</option>
              ))}
            </select>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
            >
              Submit Review
            </button>
          </div>
        </form>

        {/* Display Reviews */}
        <div className="space-y-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
                <p className="font-semibold">{review.username}</p>
                <p className="text-gray-600">ISBN: {review.isbn}</p>
                <p className="mt-2">{review.review}</p>
                <p className="mt-2">Rating: {'⭐'.repeat(review.rating)}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reviews available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
