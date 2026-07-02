// components/layout/Navbar/Navbar.jsx
import React, { useState } from "react";
import { NAV_LINKS } from "./constants";
import Logo from "./Logo";
import DesktopNavLinks from "./DesktopNavLinks";
import SearchBar from "./SearchBar";
import RightSection from "./RightSection";
import MobileToggleButton from "./MobileToggleButton";
import MobileMenu from "./MobileMenu";
import useAuth from "../../../hooks/useAuth";

export default function Navbar() {
  const { isAuthenticated, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  console.log(isAuthenticated, user, " isAuthenticated, user ");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#f5f6fa] ">
      <nav className=" bg-white  shadow-sm border border-gray-200 h-16 px-6 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation Links */}
        <DesktopNavLinks links={NAV_LINKS} />

        {/* Search Bar */}
        <SearchBar />

        {/* Right Section - Auth/Profile */}
        <RightSection isAuthenticated={isAuthenticated} user={user} />

        {/* Mobile Toggle Button */}
        <MobileToggleButton
          isOpen={isMobileMenuOpen}
          toggle={toggleMobileMenu}
        />
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        links={NAV_LINKS}
        isAuthenticated={isAuthenticated}
        onClose={closeMobileMenu}
      />
    </header>
  );
}
