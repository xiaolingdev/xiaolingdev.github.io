import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import logo from '../images/logo.png'; // 更新為正確的相對路徑

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
            <Link to="/" className="text-2xl font-bold text-black-600">
              翁曉玲
            </Link>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600 transition duration-300 mr-4"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/ai-chat" className="text-gray-600 hover:text-blue-600 transition duration-300">
              <MessageCircle size={24} />
            </Link>
          </div>
          <nav className="hidden md:flex md:items-center md:space-x-8">
            <NavLink to="/">首頁</NavLink>
            <NavLink to="/about">關於</NavLink>
            <NavLink to="/activities">官方消息</NavLink>
            <NavLink to="/policy-issues">政策議題</NavLink>
            <NavLink to="/achievements">目前績效</NavLink>
            <NavLink to="/contact">民眾服務</NavLink>
            <Link to="/ai-chat" className="text-gray-600 hover:text-blue-600 transition duration-300">
              <MessageCircle size={24} />
            </Link>
          </nav>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-50 py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-2">
              <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>首頁</MobileNavLink>
              <MobileNavLink to="/about" onClick={() => setIsMenuOpen(false)}>關於</MobileNavLink>
              <MobileNavLink to="/activities" onClick={() => setIsMenuOpen(false)}>官方消息</MobileNavLink>
              <MobileNavLink to="/policy-issues" onClick={() => setIsMenuOpen(false)}>政策議題</MobileNavLink>
              <MobileNavLink to="/achievements" onClick={() => setIsMenuOpen(false)}>目前績效</MobileNavLink>
              <MobileNavLink to="/contact" onClick={() => setIsMenuOpen(false)}>民眾服務</MobileNavLink>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-gray-600 hover:text-blue-600 transition duration-300 font-medium"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, onClick, children }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block py-2 text-gray-600 hover:text-blue-600 transition duration-300 font-medium"
  >
    {children}
  </Link>
);

export default Header;
