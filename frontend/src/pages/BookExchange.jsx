import React, { useState } from "react";
import axios from "axios";

const BookExchange = () => {
  const [numBooks, setNumBooks] = useState(1);
  const [wantedBooks, setWantedBooks] = useState([{ isbn: "" }]);
  const [givenBooks, setGivenBooks] = useState([{ isbn: "" }]);
  const [message, setMessage] = useState("");

  const handleNumBooksChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setNumBooks(count);

    setWantedBooks((prev) => Array(count).fill().map((_, i) => prev[i] || { isbn: "" }));
    setGivenBooks((prev) => Array(count).fill().map((_, i) => prev[i] || { isbn: "" }));
  };

  const handleBookChange = (setBooks, index, field, value) => {
    setBooks((prev) => {
      const updatedBooks = [...prev];
      updatedBooks[index] = { ...updatedBooks[index], [field]: value };
      return updatedBooks;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/exchange",
        { wantedBooks, givenBooks },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Trade request submitted successfully!");
      setNumBooks(1);
      setWantedBooks([{ isbn: "" }]);
      setGivenBooks([{ isbn: "" }]);
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed to submit trade request");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-green-50 to-blue-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Book Exchange Request</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
        <div className="bg-white p-8 rounded-xl shadow-xl">
          <div className="form-group mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Number of Books to Exchange</label>
            <select
              value={numBooks}
              onChange={handleNumBooksChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 transition duration-200"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-8">
            {/* Wanted Books Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Books You Want</h2>
              {wantedBooks.map((book, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-gradient-to-r from-green-100 to-green-200 shadow-lg transform transition-all hover:scale-105"
                >
                  <label className="block text-sm font-medium text-gray-600 mb-2">ISBN</label>
                  <input
                    type="text"
                    value={book.isbn}
                    onChange={(e) => handleBookChange(setWantedBooks, index, "isbn", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 transition duration-200"
                    required
                  />
                </div>
              ))}
            </div>

            {/* Given Books Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Books You Offer</h2>
              {givenBooks.map((book, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-gradient-to-r from-blue-100 to-blue-200 shadow-lg transform transition-all hover:scale-105"
                >
                  <label className="block text-sm font-medium text-gray-600 mb-2">ISBN</label>
                  <input
                    type="text"
                    value={book.isbn}
                    onChange={(e) => handleBookChange(setGivenBooks, index, "isbn", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition duration-200"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-gradient-to-r from-indigo-400 to-blue-500 hover:from-indigo-500 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
          >
            Submit Exchange Request
          </button>

          {/* Success/Failure Message */}
          {message && (
            <div
              className={`mt-6 p-4 rounded-lg text-center ${
                message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookExchange;
