import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <img
        src={book.cover}
        alt={book.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{book.title}</h2>
        <p className="text-gray-600 mb-2">By: {book.authors}</p>
        <p className="text-gray-600 mb-2">Published: {book.publishDate}</p>
        <p className="text-gray-700">{book.description}</p>
      </div>
    </div>
  );
};

export default BookCard;