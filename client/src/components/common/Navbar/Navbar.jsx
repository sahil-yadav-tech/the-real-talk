import React, { useState } from "react";
import { Bell, LogIn, User, LogOut, Menu, X, Sparkles } from "lucide-react";

export const Navbar = () => {
  // Authentication state - change this to true to see logged-in view
  const [isAuth, setIsAuth] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation links data
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  const handleAuthToggle = () => {
    setIsAuth(!isAuth);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Sparkles
                className="relative w-8 h-8 text-white"
                strokeWidth={1.5}
              />
            </div>
            <div className="flex items-baseline">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Chat
              </span>
              <span className="hidden md:inline text-xs font-light text-white/40 ml-1">
                .verse
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-white/70 hover:text-white font-medium text-sm transition-all duration-200 hover:bg-white/5 rounded-lg"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-3">
            {/* Notification Bell with Badge */}
            <button className="relative p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200">
              <Bell className="w-5 h-5" strokeWidth={1.5} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-black"></span>
            </button>

            {/* Conditional Rendering based on auth state */}
            {isAuth ? (
              // Logged In State
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl hover:border-purple-500/50 transition-all duration-200 group">
                  <User className="w-4 h-4 text-purple-400" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-white/80 group-hover:text-white">
                    Profile
                  </span>
                </button>
                <button
                  onClick={handleAuthToggle}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4 text-white/60" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-white/60">
                    Logout
                  </span>
                </button>
              </div>
            ) : (
              // Logged Out State
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAuthToggle}
                  className="flex items-center gap-2 px-5 py-2 bg-white text-black rounded-xl font-medium text-sm hover:bg-white/90 transition-all duration-200 shadow-lg shadow-white/10"
                >
                  <LogIn className="w-4 h-4" strokeWidth={1.5} />
                  Sign In
                </button>
                <button className="hidden lg:flex px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-medium text-sm text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200">
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white rounded-xl hover:bg-white/5 transition-all duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-x-0 top-16 bg-black/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="px-4 py-4 space-y-3">
          {/* Mobile Navigation Links */}
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-4 py-2 text-white/70 hover:text-white font-medium rounded-lg hover:bg-white/5 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}

          {/* Divider */}
          <div className="h-px bg-white/10 my-3"></div>

          {/* Mobile Notification */}
          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-white/70 text-sm">Notifications</span>
            <div className="relative">
              <Bell className="w-5 h-5 text-white/70" strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-black"></span>
            </div>
          </div>

          {/* Mobile Auth Section */}
          {isAuth ? (
            <div className="space-y-2 pt-2">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl">
                <User className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-white/80">
                  Profile
                </span>
              </button>
              <button
                onClick={() => {
                  handleAuthToggle();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl"
              >
                <LogOut className="w-4 h-4 text-white/60" />
                <span className="text-sm font-medium text-white/60">
                  Logout
                </span>
              </button>
            </div>
          ) : (
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  handleAuthToggle();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-black rounded-xl font-medium"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-medium text-white">
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
