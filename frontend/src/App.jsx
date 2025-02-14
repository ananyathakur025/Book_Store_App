// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import TradesList from './pages/TradesList';
import Login from './pages/Login';
import Register from './pages/Register';
import BookSearch from './pages/BookSearch';
import Reviews from './pages/Reviews';
import BookExchange from './pages/BookExchange';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} logout={logout} />
      <Routes>
        <Route path="/" element={<BookSearch />} />
        <Route
          path="/login"
          element={<Login login={login} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<BookSearch />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/exchange" element={<BookExchange />} />
        <Route path="/trades" element={<TradesList />} />
      </Routes>
    </Router>
  );
}

export default App;