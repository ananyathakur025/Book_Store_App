import React, { useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import { FiSearch, FiAlertCircle } from 'react-icons/fi';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) {
      setError('Please enter an ISBN number');
      return;
    }

    setIsLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await axios.get(
        `https://openlibrary.org/api/books?bibkeys=ISBN:${query}&format=json&jscmd=details`
      );

      const bookData = response.data[`ISBN:${query}`];

      if (bookData) {
        const formattedBook = {
          title: bookData.details?.title || 'Title Not Available',
          authors: bookData.details?.authors?.map(a => a.name).join(', ') || 'Author Unknown',
          publishDate: bookData.details?.publish_date || 'Publication Date Unknown',
          publisher: bookData.details?.publishers?.[0] || 'Publisher Not Listed',
          pageCount: bookData.details?.number_of_pages || 'Page Count Unavailable',
          cover: bookData.thumbnail_url || 'https://via.placeholder.com/150x200?text=No+Cover',
          isbn: query
        };
        setResults([formattedBook]);
      } else {
        setError('No book found with this ISBN. Please check and try again.');
      }
    } catch (error) {
      setError('We encountered an issue searching for this book. Please try again later.');
      console.error('Search Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Discover Your Next Read</h1>
          <p className="text-lg text-gray-600">Search by ISBN to explore book details and availability</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value.trim())}
                onKeyDown={handleKeyDown}
                placeholder="Enter 10 or 13-digit ISBN (e.g., 9780439708180)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-all"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-gradient-to-r from-indigo-400 to-blue-500 hover:from-indigo-500 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </>
              ) : (
                <>
                  <FiSearch className="w-5 h-5" />
                  Search
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
              <FiAlertCircle className="flex-shrink-0 w-5 h-5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {results.map((book, index) => (
            <BookCard 
              key={index}
              book={book}
              className="animate-fade-in-up"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookSearch;
