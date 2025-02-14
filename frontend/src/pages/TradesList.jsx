import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiInfo, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const TradesList = () => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/trades');
        setTrades(response.data);
      } catch (error) {
        console.error('Error fetching trades:', error);
      }
    };
    fetchTrades();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted': return <FiCheckCircle className="text-green-600" />;
      case 'rejected': return <FiXCircle className="text-red-600" />;
      default: return <FiInfo className="text-blue-600" />;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Trade Requests</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trades.map(trade => (
          <div key={trade._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">{trade.user?.username}</h3>
              <span className="flex items-center gap-1">
                {getStatusIcon(trade.status)}
                <span className={`text-sm font-medium ${
                  trade.status === 'accepted' ? 'text-green-600' :
                  trade.status === 'rejected' ? 'text-red-600' : 'text-blue-600'
                }`}>
                  {trade.status}
                </span>
              </span>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">Wanted Books</h4>
                {trade.wantedBooks.map((book, i) => (
                  <div key={i} className="mb-2 text-sm">
                    <p>ISBN: {book.isbn}</p>
                    <p>Author: {book.author}</p>
                  </div>
                ))}
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">Offered Books</h4>
                {trade.givenBooks.map((book, i) => (
                  <div key={i} className="mb-2 text-sm">
                    <p>ISBN: {book.isbn}</p>
                    <p>Author: {book.author}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              Requested on: {new Date(trade.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradesList;