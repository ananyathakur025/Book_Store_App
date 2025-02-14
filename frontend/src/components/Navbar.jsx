import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiSearch, FiBookOpen, FiMessageSquare, FiUser, FiLogIn, FiHome, FiRepeat, FiMenu, FiX } from 'react-icons/fi';

const Navbar = ({ isLoggedIn, logout }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 hover:text-blue-400 transition-colors">
          <FiBookOpen className="w-6 h-6" />
          <span>Book Exchange</span>
        </Link>

        {/* Hamburger Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden focus:outline-none">
          {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <FiHome className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <Link to="/search" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <FiSearch className="w-5 h-5" />
            <span>Search</span>
          </Link>
          <Link to="/trades" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <FiRepeat className="w-5 h-5" />
            <span>Trades</span>
          </Link>
          <Link to="/exchange" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <FiBookOpen className="w-5 h-5" />
            <span>Exchange</span>
          </Link>
          <Link to="/reviews" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <FiMessageSquare className="w-5 h-5" />
            <span>Reviews</span>
          </Link>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <FiLogIn className="w-5 h-5" />
                <span>Login</span>
              </Link>
              <Link to="/register" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <FiUser className="w-5 h-5" />
                <span>Register</span>
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="flex items-center gap-2 hover:text-blue-400 transition-colors">
              <FiLogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 py-4 px-6 flex flex-col space-y-4">
          <Link to="/" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <FiHome className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <Link to="/search" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <FiSearch className="w-5 h-5" />
            <span>Search</span>
          </Link>
          <Link to="/trades" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <FiRepeat className="w-5 h-5" />
            <span>Trades</span>
          </Link>
          <Link to="/exchange" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <FiBookOpen className="w-5 h-5" />
            <span>Exchange</span>
          </Link>
          <Link to="/reviews" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <FiMessageSquare className="w-5 h-5" />
            <span>Reviews</span>
          </Link>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <FiLogIn className="w-5 h-5" />
                <span>Login</span>
              </Link>
              <Link to="/register" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <FiUser className="w-5 h-5" />
                <span>Register</span>
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="flex items-center gap-2 hover:text-blue-400 transition-colors">
              <FiLogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
