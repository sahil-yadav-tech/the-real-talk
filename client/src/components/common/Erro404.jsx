// pages/Erro404.jsx (Enhanced with search)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, AlertTriangle, Compass, Search, X } from 'lucide-react';

const Erro404 = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // You can implement actual search logic here
      console.log('Searching for:', searchQuery);
      alert(`Searching for "${searchQuery}" - This would typically redirect to search results`);
    }
  };

  const suggestedPages = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/home', icon: Compass },
    { name: 'Login', path: '/login', icon: ArrowLeft },
    { name: 'Register', path: '/register', icon: ArrowLeft },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="relative mb-8">
          <div className="text-[150px] md:text-[200px] font-bold leading-none tracking-tighter">
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
              404
            </span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-ping"></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="w-6 h-6 text-yellow-500 animate-pulse" />
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Page Not Found
            </h2>
          </div>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Search Bar (Optional Feature) */}
        {showSearch ? (
          <div className="mb-8">
            <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for pages..."
                className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                autoFocus
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </button>
              <button
                type="button"
                onClick={() => setShowSearch(false)}
                className="absolute right-12 top-1/2 -translate-y-1/2"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </button>
            </form>
          </div>
        ) : (
          <button
            onClick={() => setShowSearch(true)}
            className="mb-8 text-gray-500 hover:text-purple-400 text-sm transition-colors inline-flex items-center gap-1"
          >
            <Search className="w-4 h-4" />
            Search instead?
          </button>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={() => navigate(-1)}
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
            <span className="text-white/90 font-medium">Go Back</span>
          </button>

          <button
            onClick={() => navigate('/')}
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
          >
            <Home className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>Return Home</span>
          </button>
        </div>

        {/* Suggested Pages */}
        {/* <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm mb-4">🚀 Quick Navigation</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {suggestedPages.map((page, index) => (
              <button
                key={index}
                onClick={() => navigate(page.path)}
                className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group hover:scale-105"
              >
                <page.icon className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                  {page.name}
                </span>
              </button>
            ))}
          </div>
        </div> */}

        {/* Fun Fact */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-xs">
            💡 Fun Fact: The first 404 error was reported in 1993 at CERN.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Erro404;