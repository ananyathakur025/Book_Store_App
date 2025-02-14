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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Book Exchange Request</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="form-group">
            <label className="block text-gray-700 mb-2">Number of Books to Exchange</label>
            <select
              value={numBooks}
              onChange={handleNumBooksChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-6 mt-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Books You Want</h2>
              {wantedBooks.map((book, index) => (
                <div key={index} className="space-y-2 border p-4 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">ISBN</label>
                    <input
                      type="text"
                      value={book.isbn}
                      onChange={(e) => handleBookChange(setWantedBooks, index, "isbn", e.target.value)}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Books You Offer</h2>
              {givenBooks.map((book, index) => (
                <div key={index} className="space-y-2 border p-4 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">ISBN</label>
                    <input
                      type="text"
                      value={book.isbn}
                      onChange={(e) => handleBookChange(setGivenBooks, index, "isbn", e.target.value)}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Submit Exchange Request
          </button>

          {message && (
            <div
              className={`mt-4 p-3 rounded-lg text-center ${
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
