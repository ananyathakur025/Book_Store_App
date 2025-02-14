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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reviews</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      {/* Review Submission Form */}
      <form onSubmit={handleSubmit} className="mb-4 bg-gray-100 p-4 rounded-lg shadow">
        <div className="space-y-3">
          <input
            type="text"
            value={newReview.isbn}
            onChange={(e) => setNewReview({ ...newReview, isbn: e.target.value })}
            placeholder="Enter ISBN Number"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <textarea
            value={newReview.review}
            onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
            placeholder="Write your review..."
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <select
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num} Stars</option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Review
          </button>
        </div>
      </form>

      {/* Display Reviews */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review._id} className="p-4 border border-gray-300 rounded">
              <p className="font-bold">{review.username}</p>
              <p className="text-gray-600">ISBN: {review.isbn}</p>
              <p className="mt-2">{review.review}</p>
              <p className="mt-1">Rating: {'⭐'.repeat(review.rating)}</p>
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
  );
};

export default Reviews;
